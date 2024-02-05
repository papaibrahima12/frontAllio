// SignUp.js
import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import { signup } from '../../api/axios'
import { routeHandler } from '../../api/routeHandler'
import { Link } from 'react-router-dom';
import { Input, Checkbox, Button, Typography,Alert, Card, CardHeader, CardBody } from "@material-tailwind/react";

export function SignUp() {
  const navigateTo = useNavigate()
  const [formInput, setFormInput] = React.useState({
      telephone: "",
      email: "",
      ninea: "",
      adresse:"",
      password: "",
      new_password:""
  })
  const [error, setError] = React.useState("");
  const { auth } = useContext(AuthContext)
  const [jwt, setJWt] = auth

  

  const handleForm = () => {
    if (formInput.password !== formInput.new_password) {
      setError(" ❌ Les mots de passe ne correspondent pas");
    }else{
      signup(formInput)
          .then(res => {
              setFormInput({
                telephone: "",
                email: "",
                ninea: "",
                adresse:"",
                password: "",
                new_password:""
              })
              setJWt(res.data)
              // navigateTo("/auth/sign-in")
              
          })
          .catch(error => {
              alert(error.message)
          })
          setError("")
  }
}

  useEffect(()=>{
      routeHandler(jwt)
  },[])



  return (
    <section className="m-8 flex ">
            {/* <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div> */}
      
      <div className="w-full  flex flex-col items-center justify-center">
      <Card className=' max-w-screen-lg sm:w-96 flex flex-col '>
        <div className="text-center">
        <CardHeader
        
        color="gray"
        className="mb-4 grid h-28 place-items-center bg-lycs"
      >
        <Typography variant="h2" className="font-bold mb-4">Bienvenue chez nous</Typography>
        </CardHeader>
        </div>
        <CardBody className="flex flex-col gap-4 mx-3 ">
          <div className="mb-1 flex flex-col gap-6">
          <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Contact
            </Typography>
            <Input
          size="lg"
          placeholder="Contact"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          onChange={(e) => setFormInput({ ...formInput, telephone: e.target.value })}
                            value={formInput.telephone}
                            type="phone"
        />
          <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Ninea
            </Typography>
            <Input
          size="lg"
          placeholder="NB123345RRR"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          onChange={(e) => setFormInput({ ...formInput, ninea: e.target.value })}
                            value={formInput.ninea}
                            type="text"
        />
        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Adresse
            </Typography>
            <Input
          size="lg"
          placeholder="Dakar"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          onChange={(e) => setFormInput({ ...formInput, adresse: e.target.value })}
                            value={formInput.adresse}
                            type="address"
        />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Email
            </Typography>
            <Input
            autoComplete='username'
          type="email"
          size="lg"
          placeholder="name@mail.com"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          onChange={(e) => setFormInput({ ...formInput, email: e.target.value })}
                            value={formInput.email}
        />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Mot de passe
            </Typography>
            <Input
           
          type="password"
          size="lg"
          placeholder="********"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          onChange={(e) => setFormInput({ ...formInput, password: e.target.value })}
          value={formInput.password}
        />
        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
            Confirmer mot de passe
          </Typography>
          <Input
          autoComplete="new-password"
          type="password"
          size="lg"
          placeholder="********"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          onChange={(e) => setFormInput({ ...formInput, new_password: e.target.value })}
          value={formInput.new_password}
        />
        {error && (
        <Typography variant="small" color="red" className="mt-2">
          {error}
        </Typography>
      )}
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
          <Button className="mt-6 bg-lycs" fullWidth  onClick={() => { handleForm() }}>
          S'inscrire
        </Button>
        

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
          Déjà un compte ?
            <Link to="/auth/sign" className="text-gray-900 ml-1">Se connecter</Link>
          </Typography>
        </CardBody>

      </Card>
      </div>
    </section>
  );
}

export default SignUp;
