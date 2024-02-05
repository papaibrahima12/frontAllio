import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Button,
  Dialog,
  Input,
  select,
  option,
  Checkbox,
} from "@material-tailwind/react";
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import { addBon, getBon } from '../../api/axios'; // Assurez-vous d'avoir la fonction addBon définie dans votre fichier d'API.
import { routeHandler } from '../../api/routeHandler';
import React from "react";
import { Link } from "react-router-dom";

import {  projectsData } from "@/data";
import { DataBon } from "../datas";
export function Bon() {
  // const navigateTo = useNavigate();
  const [data, setData] = useState([]);
  const { auth } = useContext(AuthContext);
  const [jwt, setJWt] = auth;
  const [open, setOpen] = React.useState(false);
  // le formulaire
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
  // La fonction ajouter des produits
  const handleAddBon = () => {
    const formData = new FormData();
    formData.append("nomBon", formInput.nomBon);
    formData.append("dateDebut", formInput.dateDebut);
    formData.append("dateFin", formInput.dateFin);
    formData.append("typeBon", formInput.typeBon);
    formData.append("typeReduction", formInput.typeReduction);
    formData.append("codeReduction", formInput.codeReduction);
    formData.append("reduction", formInput.reduction);
    formData.append("ageCible", formInput.ageCible);
    formData.append("sexeCible", formInput.sexeCible);
    formData.append("localisation", formInput.localisation);
    formData.append("image", formInput.image);
  

    addBon(formData)
      .then(res => {
        setFormInput({
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
        // Vous pouvez mettre à jour l'état ou effectuer d'autres actions après l'ajout du produit.
        setJWt(res.data);
        // Naviguer vers une autre page ou effectuer d'autres actions si nécessaire.
      })
      .catch(error => {
        alert(error.message);
        console.error(" the eror",error)
      });
      console.log('mon formulaire', formInput);
  };
  
  // useEffect(()=>{
  //   routeHandler(navigateTo, jwt)
  // },[])


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
 
  return (
    <>
     <Button onClick={handleOpen} className="bg-lycs">Ajout <i className="fas fa-add b" /></Button>
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
            <DataBon/>
    </>
    
  );
}

export default Bon;

