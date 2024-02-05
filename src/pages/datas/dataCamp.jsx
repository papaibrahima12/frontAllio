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
   
  } from "@material-tailwind/react";
 
  import { useEffect, useContext, useState } from 'react';
//   import { useNavigate } from 'react-router-dom';
//   import { AuthContext } from '../../App';
  import { getCamp, deletCamp } from '../../api/axios'; // Assurez-vous d'avoir la fonction addcamp définie dans votre fichier d'API.
  import { routeHandler } from '../../api/routeHandler';
  import React from "react";
  import { UpdateCamp } from "./updateCamp";
  
  import { Link, useParams } from "react-router-dom";
  import { Pagination } from '../dashboard/pagination';
  import {  authorsTableData, projectsData } from "@/data";
  export function DataCamp() {
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [campToDeleteId, setCampToDeleteId] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [campToEditId, setCampToEditId] = useState(null);


    // const navigateTo = useNavigate();
    const [data, setData] = useState([]);
    const [active, setActive] = useState(1);
    const dataPerPage = 5; // Nombre d'éléments par page

    const handleDeleteCamp = (id) => {
      deletCamp(id)
        .then((response) => {
        setConfirmationDialogOpen(false);
          // Mettez à jour l'état ou effectuez d'autres actions si nécessaire
          console.log('Campagne supprimée avec succès', response);
          window.location.reload();
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression de la campagne :', error);
        });
    };
    const handleEdit= ()=> {
      const  {id} = useParams();
  
      
    }
    
    useEffect(() => {
        getCamp()
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
    const lastestCamp = data.slice().reverse().slice(0, 4);
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
                Êtes-vous sûr de vouloir supprimer cette campagne ?
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button className="bg-lycs" onClick={() => handleDeleteCamp(campToDeleteId)}>
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
            Recentes
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              {lastestCamp.map((camp, index)  => (
                  <Card key={index} color="transparent" shadow={false}>
                    <CardHeader
                      floated={false}
                      color="gray"
                      className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                    >
                      <img
                        src={camp.image}
                        alt={camp.nomCampagne}
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
                        {camp.nomCampagne}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {/* {description} */}
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
            Toutes les Campagnes
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Nom Campagen", "Code Promo", "Date debut", "Date fin","Age cible" ,"Sexe cible" ,"Adresse","Action",""].map((el) => (
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
      {currentData.map((camp, index) => (
        <tr key={index}>
          <td className="py-3 px-5">
            <div className="flex items-center gap-4">
              {/* Include any relevant data from the 'camp' object */}
              <Typography
                variant="small"
                color="blue-gray"
                className="font-semibold"
              >
                {camp.nomCampagne}
                <img src={camp.image} alt={camp.nomCampagne} className="h-8 w-8 rounded-full" />
              </Typography>
              {/* Include other relevant data here */}
            </div>
          </td>
          <td className="py-3 px-5">
            <Typography className="text-xs font-semibold text-blue-gray-600">
              {camp.codePromo}
            </Typography>
          </td>
          <td className="py-3 px-5">
            <Typography className="text-xs font-semibold text-blue-gray-600">
              {new Date(camp.dateDebut).toLocaleDateString('fr-FR')}
            </Typography>
          </td>
          {/* Include other columns for different fields */}
          <td className="py-3 px-5">
            <Typography className="text-xs font-semibold text-blue-gray-600">
              {new Date(camp.dateFin).toLocaleDateString('fr-FR')}
            </Typography>
          </td>
          
          <td className="py-3 px-5">
            <Typography className="text-xs font-semibold text-blue-gray-600">
              {camp.ageCible}
            </Typography>
            
          </td>
          <td className="py-3 px-5">
            <Typography className="text-xs font-semibold text-blue-gray-600">
              {camp.sexeCible}
            </Typography>
            
          </td>
          <td className="py-3 px-5">
            <Typography className="text-xs font-semibold text-blue-gray-600">
              {camp.localisation}
            </Typography>
            
          </td>
          <td >
                      <Tooltip content="Modifier">
                        <IconButton variant="text" color="green" onClick={UpdateCamp}>
                        <i className="fa-solid fa-pen-to-square"/>
                         
                        </IconButton>
                       
                      </Tooltip>
                                <Tooltip content="Supprimer">
            <IconButton variant="text" color="red" onClick={() => {
              setCampToDeleteId(camp.id);
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
        <Pagination dataPerPage={dataPerPage} totalData={data.length} paginate={paginate} />

      </Card>
    </div>
        </>

      )}
