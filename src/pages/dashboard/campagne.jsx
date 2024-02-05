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
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import { addCamp } from '../../api/axios'; // Assurez-vous d'avoir la fonction addCamp définie dans votre fichier d'API.
import { routeHandler } from '../../api/routeHandler';
import React from "react";
import { Link } from "react-router-dom";
import {DataCamp} from '../datas'
import {  authorsTableData, projectsData } from "@/data";
import { useState } from "react";
export function Campagne() {
  // const navigateTo = useNavigate();
  const { auth } = useContext(AuthContext);
  const [jwt, setJWt] = auth;
  const [open, setOpen] = React.useState(false);
  // const [file, setFile]= useState();
 
  
  
  // le formulaire
  const [formInput, setFormInput] = React.useState({
    nomCampagne: "",
    codePromo: "",
    dateDebut: "",
    dateFin: "",
    ageCible: "",
    sexeCible: "",
    localisation:"",
    image: ""
    

  });
  
  const handFile = (e) => {
    const data = new FormData();
    data.append('image', e.target.files[0]);
  
    setFormInput({
      ...formInput,
      image: e.target.files[0], 
    });
  
   
  };
  
  
  const handleAddCamp = () => {
    const formData = new FormData();
    formData.append("nomCampagne", formInput.nomCampagne);
    formData.append("codePromo", formInput.codePromo);
    formData.append("dateDebut", formInput.dateDebut);
    formData.append("dateFin", formInput.dateFin);
    formData.append("ageCible", formInput.ageCible);
    formData.append("sexeCible", formInput.sexeCible);
    formData.append("localisation", formInput.localisation);
    formData.append("image", formInput.image);
  
    console.log('mon formulaire', formInput);
  
    addCamp(formData)
      .then((res) => {
        setFormInput({
          nomCampagne: "",
          codePromo: "",
          dateDebut: "",
          dateFin: "",
          ageCible: "",
          sexeCible: "",
          localisation: "",
          image: "",
        });
        setJWt(res.data);
      })
      .catch((error) => {
        alert(error.message);
        console.error("Erreur :", error);
      });
  };
  
  const handleOpen = () => setOpen((cur) => !cur);
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
            Créer une Campagne
            </Typography>
            </CardBody>
            <CardBody className="flex flex-col gap-4 grid  grid-cols-1 md:grid-cols-2  ">
            
            <Input label="Nom" size="lg"  onChange={(e) => setFormInput({ ...formInput, nomCampagne: e.target.value })}
            value={formInput.nomCampagne}/>
            <Input label="Code Promo" size="lg" onChange={(e) => setFormInput({ ...formInput, codePromo: e.target.value })}
            value={formInput.codePromo} />
            <Input label="Date de debut" size="lg" type="date" onChange={(e) => setFormInput({ ...formInput, dateDebut: e.target.value })}
            value={formInput.dateDebut}/>
            <Input label="Date de fin" size="lg"type="date" onChange={(e) => setFormInput({ ...formInput, dateFin: e.target.value })}
            value={formInput.dateFin} />
             
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
             
              
            <Input label="Image" size="lg" type="file" accept="image/*"
            
             onChange={handFile} />
            
            </CardBody>
           
            
            
            {/* <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div> */}
          
          <CardFooter className="pt-0">
            <Button className="bg-lycs" onClick={()=>{handleAddCamp(); handleOpen();}}   >
            Créer
            </Button>
            
          </CardFooter>
        </Card>
      </Dialog>
    <DataCamp/>
    </>
    
  );
}

export default Campagne;

