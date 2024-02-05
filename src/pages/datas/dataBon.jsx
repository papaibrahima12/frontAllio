import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Dialog,
    Tooltip,
    Button,
    IconButton,
    Input
   
  } from "@material-tailwind/react";
  import { useEffect, useContext, useState } from 'react';
  // import UpdateBon from './updateBon'
//   import { useNavigate } from 'react-router-dom';
//   import { AuthContext } from '../../App';
  import {  deletBon, getBon, updateBon } from '../../api/axios'; // Assurez-vous d'avoir la fonction addBon définie dans votre fichier d'API.
  import { routeHandler } from '../../api/routeHandler';
  import React from "react";
  
  import { Link , useParams} from "react-router-dom";
  import { Pagination } from '../dashboard/pagination';
  import {  projectsData } from "@/data";
  export function DataBon() {
    // const navigateTo = useNavigate();
    const [data, setData] = useState([]);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [bonToDeleteId, setBonToDeleteId] = useState(null);
    const [active, setActive] = useState(1);
    const dataPerPage = 5; // Nombre d'éléments par page
    const [open, setOpen] = React.useState(false);
    const [formInput, setFormInput] = React.useState({
      nomBon: "",
      dateDebut: "",
      dateFin: "",
      typeBon: "",
      typeReduction: "",
      codeReduction: "",
      reduction: "",
      ageCible: "",
      sexeCible: "",
      localisation:"",
      image:""
  
    });
    const handFile = (e) => {
      const data = new FormData();
      data.append('image', e.target.files[0]);
    
      setFormInput({
        ...formInput,
        image: e.target.files[0], 
      });
    
     
    };

  
    const handleDeleteBon = (id) => {
      deletBon(id)
        .then((response) => {
          // Mettez à jour l'état ou effectuez d'autres actions si nécessaire
          console.log('Bon supprimé avec succès', response);
          setConfirmationDialogOpen(false);
          window.location.reload();
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression de la bonagne :', error);
        });
    };
    const handleOpen = () => setOpen((cur) => !cur);
    useEffect(() => {
        getBon()
          .then(res => {
            console.log("testermmes donnees",res.data); // Log the received data
            
            setData(res.data);
            

          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

      // La pagination des pages
    const indexOfLastData = active * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = data.slice(indexOfFirstData, indexOfLastData);
    const lastestBons = data.slice().reverse().slice(0, 4);
  const paginate = (pageNumber) => {
    if (pageNumber === "prev" && active > 1) {
      setActive(active - 1);
    } else if (pageNumber === "next" && active < Math.ceil(data.length / dataPerPage)) {
      setActive(active + 1);
    } else {
      setActive(pageNumber);
    }
  };

      return(
        <>
        {/* debut Modification */}
        <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
     <Card className="mx-auto w-full max-w-80 items-center justify-center">
          <CardBody className="flex flex-col ">
            <Typography variant="h4" color="blue-gray">
            Créer un bon
            </Typography>
            </CardBody>
            <CardBody className="flex flex-col gap-4 grid  grid-cols-1 md:grid-cols-2  ">
            
            <Input label="Nom" size="lg"  onChange={(e) => setFormInput({ ...formInput, nomBon: e.target.value })}
            value={formInput.nomBon}/>
            <Input label="Type de bon" size="lg" onChange={(e) => setFormInput({ ...formInput, typeBon: e.target.value })}
            value={formInput.typeBon} />
            <Input label="Date de debut" size="lg" type="date" onChange={(e) => setFormInput({ ...formInput, dateDebut: e.target.value })}
            value={formInput.dateDebut}/>
            <Input label="Date de fin" size="lg"type="date" onChange={(e) => setFormInput({ ...formInput, dateFin: e.target.value })}
            value={formInput.dateFin} />
            <select label="Age cible" size="lg" onChange={(e) => setFormInput({ ...formInput, typeReduction: e.target.value })}
               class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                value={formInput.typeReduction}>
             
              <option value="taux">taux</option>
              <option value="montant">montant</option>
             
            </select> 
            <Input label="code de reduction" size="lg" onChange={(e) => setFormInput({ ...formInput, codeReduction: e.target.value })}
            value={formInput.codeReduction}/>
            <Input label="Reduction" size="lg" type="number"  onChange={(e) => setFormInput({ ...formInput, reduction: e.target.value })}
            value={formInput.reduction}/>
             
             <select label="Age cible" size="lg" onChange={(e) => setFormInput({ ...formInput, ageCible: e.target.value })}
               class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                value={formInput.ageCible}>
             
              <option value="10-20ans">10-20ans</option>
              <option value="20-30ans">20-30ans</option>
              <option value="30-50ans">30-50ans</option>
              <option value="50-60ans">50-60ans</option>
              <option value="60-plus"> 60-plus</option>
            </select> 
           <select label="Sexe cible" size="lg"  onChange={(e) => setFormInput({ ...formInput, sexeCible: e.target.value }) }
               class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                value={formInput.sexeCible} >
              <option value="Masculin"> Masculin</option>
              <option value="Feminin">Feminin</option>
              
            </select> 
            <select 
              onChange={(e) => setFormInput({ ...formInput, localisation: e.target.value }) }
              value={formInput.localisation}
             label="Choisi ton adress" id="underline_select" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
            <option value="Dakar"> Dakar</option>
              <option value="Diourbel">Diourbel</option>
              <option value="Fatick">Fatick</option>
              <option value="Kaffrine">Kaffrine</option>
              <option value="Kaolack">Kaolack</option>
              <option value="Kedougou">Kedougou</option>
              <option value="Kolda"> Kolda</option>
              <option value="Louga">Louga </option>
              <option value="Matam"> Matam</option>
              <option value="Saint-Louis"> Saint-Louis</option>
              <option value="Sedhiou"> Sedhiou</option>
              <option value="Tambacounda">Tambacounda</option>
              <option value="Thies">Thies</option>
              <option value="Ziguinchor">Ziguinchor</option>
              
            </select>
             
              
            <Input label="Image" size="lg"    type="file"
            accept="image/*"
            onChange={handFile}/>
            
            </CardBody>
           
            
            
            {/* <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div> */}
          
          <CardFooter className="pt-0">
            <Button className="bg-lycs" onClick={() => {handleAddBon(); handleOpen();  }}  >
            Créer
            </Button>
            
          </CardFooter>
        </Card>
      </Dialog>
        {/* Fin Modification */}
          <Dialog
          size="sm"
          open={confirmationDialogOpen}
          handler={() => setConfirmationDialogOpen(false)}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-80">
            <CardBody className="flex flex-col">
              <Typography variant="h4" color="blue-gray">
                Confirmation de suppression
              </Typography>
            </CardBody>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="body" color="blue-gray">
                Êtes-vous sûr de vouloir supprimer ce bon ?
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button className="bg-lycs" onClick={() => handleDeleteBon(bonToDeleteId)}>
                Oui
              </Button>
              <Button className="ml-2 bg-red-500" onClick={() => setConfirmationDialogOpen(false)}>
                Annuler
              </Button>
            </CardFooter>
          </Card>
        </Dialog>

         <div className="mt-12 mb-8 flex flex-col gap-12">
      
      {/* befor card */}
      <Card>
        <CardHeader  color="gray" className="mb-8 p-6 bg-lycs">
          <Typography variant="h6" color="white">
            Recents
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              {lastestBons.map((bon, index) => (
                  <Card key={index} color="transparent" shadow={false}>
                    <CardHeader
                      floated={false}
                      color="gray"
                      className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                    >
                      <img
                        src={bon.image}
                        alt={bon.nomBon}
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody className="py-0 px-1">
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        
                      </Typography>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mt-1 mb-2"
                      >
                        {bon.nomBon}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {bon.typeBon}
                      </Typography>
                    </CardBody>
                    {/* <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                      <Link to={route}>
                        <Button variant="outlined" size="sm">
                          view project
                        </Button>
                      </Link>
                      <div>
                        {members.map(({ img, name }, key) => (
                          <Tooltip key={name} content={name}>
                            <Avatar
                              src={img}
                              alt={name}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white ${
                                key === 0 ? "" : "-ml-2.5"
                              }`}
                            />
                          </Tooltip>
                        ))}
                      </div>
                    </CardFooter> */}
                  </Card>
                )
              )}
            </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader   color="gray" className="mb-8 p-6 bg-lycs">
          <Typography variant="h6" color="white">
            Tous les bons
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
  <table className="w-full min-w-[640px] table-auto">
    <thead>
      <tr>
        {["Bon", "Date debut", "Date fin", "Type de bon", "Type de reduction", "Code de reduction","Reduction", "Age Cible", "Sexe Cible", "Adresse","Action", ""].map((el) => (
          <th
            key={el}
            className="border-b border-blue-gray-50 py-3 px-5 text-left"
          >
            <Typography
              variant="small"
              className="text-[11px] font-bold uppercase text-blue-gray-400"
            >
              {el}
            </Typography>
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {currentData.map((bon, index) => (
        <tr key={index}>
          <td className="py-3 px-5">
            <div className="flex items-center gap-4">
              {/* Include any relevant data from the 'bon' object */}
              <Typography
                variant="small"
                color="blue-gray"
                className="font-semibold"
              >
                {bon.nomBon}
                <img src={bon.image} alt={bon.nomBon} className="h-8 w-8 rounded-full" />
              </Typography>
              {/* Include other relevant data here */}
            </div>
          </td>
          <td className="py-3 px-5">
            <Typography className="text-xs font-semibold text-blue-gray-600">
               {new Date(bon.dateDebut).toLocaleDateString('fr-FR')}
            </Typography>
          </td>
          {/* Include other columns for different fields */}
          <td className="py-3 px-5">
            <Typography className="text-xs font-semibold text-blue-gray-600">
              {new Date(bon.dateFin).toLocaleDateString('fr-FR')}
            </Typography>
          </td>
          <td className="py-3 px-5">
            <Typography className="text-xs font-semibold text-blue-gray-600">
              {bon.typeBon}
            </Typography>
          </td>
          <td className="py-3 px-5">
            <Typography className="text-xs font-semibold text-blue-gray-600">
              {bon.typeReduction}
            </Typography>
            
          </td>
          <td className="py-3 px-5">
            <Typography className="text-xs font-semibold text-blue-gray-600">
              {bon.codeReduction}
            </Typography>
            
          </td>
          <td className="py-3 px-5">
            <Typography className="text-xs font-semibold text-blue-gray-600">
              {bon.reduction}
            </Typography>
            
          </td>
          <td className="py-3 px-5">
            <Typography className="text-xs font-semibold text-blue-gray-600">
              {bon.ageCible}
            </Typography>
            
          </td>
          <td className="py-3 px-5">
            <Typography className="text-xs font-semibold text-blue-gray-600">
              {bon.sexeCible}
            </Typography>
            
          </td>
          <td className="py-3 px-5">
            <Typography className="text-xs font-semibold text-blue-gray-600">
              {bon.localisation}
            </Typography>
            
          </td>
          <td >
                      <Tooltip content="Modifier">
                        <IconButton variant="text" color="green" >
                        <i className="fa-solid fa-pen-to-square"/>
                        </IconButton>
                       
                      </Tooltip>
                      <Tooltip content="Supprimer">
            <IconButton variant="text" color="red" onClick={() => {
              setBonToDeleteId(bon.id);
              setConfirmationDialogOpen(true);
            }}>
              <i className="fas fa-trash" />
            </IconButton>
          </Tooltip>
                    </td>
        </tr>
      ))}
    </tbody>
  </table>
</CardBody>
{/* Ajoutez la pagination en bas du tableau */}
<Pagination dataPerPage={dataPerPage} totalData={data.length} paginate={paginate} />

      </Card>
    </div>
        </>
      );
    }  