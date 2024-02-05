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
  import {  deletBon, getBon } from '../../api/axios'; // Assurez-vous d'avoir la fonction addBon définie dans votre fichier d'API.
  import { routeHandler } from '../../api/routeHandler';
  import React from "react";
  
  import { Link } from "react-router-dom";
  import { Pagination } from '../dashboard/pagination';
  import {  projectsData } from "@/data";
  export function DataBon() {
    // const navigateTo = useNavigate();
    const [data, setData] = useState([]);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [bonToDeleteId, setBonToDeleteId] = useState(null);
    const [active, setActive] = useState(1);
    const dataPerPage = 5; // Nombre d'éléments par page

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
              {bon.dateDebut}
            </Typography>
          </td>
          {/* Include other columns for different fields */}
          <td className="py-3 px-5">
            <Typography className="text-xs font-semibold text-blue-gray-600">
              {bon.dateFin}
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
                        <IconButton variant="text" color="green">
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