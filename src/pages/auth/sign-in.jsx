import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import { login } from '../../api/axios'
import { Link } from 'react-router-dom';
// import { routeHandler } from '../../api/routeHandler'
import { Input, Checkbox, Button, Typography ,Spinner, Alert, Card, CardHeader, CardBody, CardFooter} from "@material-tailwind/react";

export  function Login() {
  const navigateTo = useNavigate()
  const { auth } = useContext(AuthContext)
  const [jwt, setJWt] = auth

  const [formInput, setFormInput] = React.useState({
    email: "",
    password: "",
  });
  
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const handleForm = () => {
    login(formInput)
      .then((res) => {
        setFormInput({
          email: "",
          password: "",
        });
        // Sauvegarder le token dans le localStorage
        localStorage.setItem("jwt", res.data.token);
        setJWt(res.data);
        console.log("voici le res", localStorage.getItem("jwt"));
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
        setTimeout(() => {
          navigateTo("/dashboard/home");
        }, 2000);
      })
      .catch((error) => {
        if (error.response) {
          // La requête a été effectuée et le serveur a répondu avec un code d'erreur
          if (error.response.status === 401) {
            setError("Email ou mot de passe incorrect ou bien votre compte n'est pas actif");
          } else {
            setError("Une erreur s'est produite lors de la connexion");
          }
        } else if (error.request) {
          // La requête a été effectuée mais aucune réponse n'a été reçue
          setError("Aucune réponse du serveur");
        } else {
          // Une autre erreur s'est produite lors de la configuration de la requête
          setError("Une erreur s'est produite");
        }
        setTimeout(() => {
          setError("");
        }, 4000);
      });
  };
  
  // ...
  
  
  
  
  useEffect(() => {
    const storedToken = localStorage.getItem('jwt');
    if (storedToken) {
      setJWt(storedToken);
    }

      // routeHandler(navigateTo, jwt)
  }, [])

  return (
    <section className="m-8 flex gap-4 ">
      <div className="w-full  flex flex-col items-center justify-center">
      <Card className="max-w-screen-lg sm:w-96 flex flex-col mt-3 ">
      <CardHeader
        
        color="gray"
        className="mb-4 grid h-28 place-items-center bg-lycs"
      >
        <Typography variant="h2" className="font-bold mb-4">Se connecter</Typography>
        </CardHeader>
        
        
        <CardBody className="flex flex-col gap-4">
          <div className="mb-1 flex flex-col gap-6">
          {success && (
  <Alert color="green" className="mt-2">
    Connexion réussie ! Redirection vers le tableau de bord...
  </Alert>
)}
{error && (
    <Alert variant="small" color="red" className="mt-2">
      {error}
    </Alert>
  )}
            <label variant="small" color="blue-gray" className="-mb-3 font-medium"  >
              Email
            </label>
            <Input
          size="lg"
          placeholder="name@mail.com"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          onChange={(e) => setFormInput({ ...formInput, email: e.target.value })}
          value={formInput.email}
          type="email"
        />
            <label variant="small" color="blue-gray" className="-mb-3 font-medium"  >
              Mot de passe
            </label>
            <Input
          
          size="lg"
          placeholder="********"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          onChange={(e) => setFormInput({ ...formInput, password: e.target.value })}
                            value={formInput.password}
                            type="password"
        />
        
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                J'acceptes&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Les termes et les Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
           <Button className="mt-6 bg-lycs" fullWidth onClick={() => { handleForm() }} >
          {/* <Link to="/dashborad/home">Se connecter </Link> */}Se connecter
          {/* <Spinner className="h-6 w-4/5 ml-6 text-white-600 " /> */}
          </Button>
          
          <div className="flex items-center justify-between gap-2 mt-6">
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center justify-start font-medium"
                >
                  Subscribe me to newsletter
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">
                Mot de passe oublié
              </a>
            </Typography>
          </div>
          {/* <div className="space-y-4 mt-8">
            <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1156_824)">
                  <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
                  <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
                  <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
                  <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
                </g>
                <defs>
                  <clipPath id="clip0_1156_824">
                    <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
              <span>Sign in With Google</span>
            </Button>
            <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
              <img src="/img/twitter-logo.svg" height={24} width={24} alt="" />
              <span>Sign in With Twitter</span>
            </Button>
          </div> */}
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Pas de compte?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Créer un compte</Link>
          </Typography>
        </CardBody>
        </Card>
      </div>
      {/* <div className="w-2/5 h-full hidden lg:block">
      <video className="h-full w-full rounded-lg" controls autoPlay muted>
      <source src="/public/video/DigitalMarketing.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <video className="h-full w-full rounded-lg" controls autoPlay muted>
      <source src="/public/video/HappyCustomers.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
      </div> */}

    </section>
  );
}


export default Login;