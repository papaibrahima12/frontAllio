import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
  Button,
  Dialog,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { DataManager } from "@/auth";

export function Bon() {
  const [open, setOpen] = useState(false);
  const [bonsData, setBonsData] = useState([]);
  const [nom, setNom] = useState('');
  const [type, setType] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [typeReduction, setTypeReduction] = useState('');
  const [codeReduction, setCodeReduction] = useState('');
  const [reduction, setReduction] = useState('');
  const [ageCible, setAgeCible] = useState('');
  const [sexeCible, setSexeCible] = useState('');
  const [adresse, setAdresse] = useState('');
  const [image, setImage] = useState('');

  const { data: bonsDataFromAPI, isLoading, error, handleAddData: handleAddBon } = DataManager();

  useEffect(() => {
    setBonsData(bonsDataFromAPI);
  }, [bonsDataFromAPI]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createBon = async () => {
    try {
      // Utilisez la fonction de DataManager pour ajouter le bon
      await handleAddBon({
        nom,
        type,
        dateDebut,
        dateFin,
        typeReduction,
        codeReduction,
        reduction,
        ageCible,
        sexeCible,
        adresse,
        image,
      });

      // Fermez le dialogue après la création du bon
      handleClose();
    } catch (error) {
      console.error("Erreur lors de la création du bon:", error);
      // Gérez l'erreur ici (par exemple, affichez un message à l'utilisateur)
    }
  };

  return (
    <>
      <Button onClick={handleOpen} className="bg-lycs">
        Ajout <i className="fas fa-add b" />
      </Button>
      <Dialog size="xs" open={open} handler={handleClose} className="bg-transparent shadow-none">
        <Card className="mx-auto w-full max-w-80">
          <CardBody className="flex flex-col ">
            <Typography variant="h4" color="blue-gray">
              Créer un bon
            </Typography>
          </CardBody>
          <CardBody className="flex flex-col gap-4 grid grid-cols-2">
            <Input label="Nom" value={nom} onChange={(e) => setNom(e.target.value)} size="lg" />
            <Input label="Type de bon" value={type} onChange={(e) => setType(e.target.value)} size="lg" />
            {/* Ajoutez les autres champs du formulaire */}
          </CardBody>
          <CardFooter className="pt-0">
            <Button className="bg-lycs" onClick={createBon} size="xs">
              Créer
            </Button>
          </CardFooter>
        </Card>
      </Dialog>

      <div className="mt-12 mb-8 flex flex-col gap-12">
        {/* befor card */}
        <Card>
          <CardHeader color="gray" className="mb-8 p-6 bg-lycs">
            <Typography variant="h6" color="white">
              Recents
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              {bonsData.map((bon) => (
                <Card key={bon.id} color="transparent" shadow={false}>
                  <CardHeader
                    floated={false}
                    color="gray"
                    className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                  >
                    {/* Ajoutez ici l'image du bon */}
                    <img
                      src={bon.image}
                      alt={bon.nom}
                      className="h-full w-full object-cover"
                    />
                  </CardHeader>
                  <CardBody className="py-0 px-1">
                    {/* Ajoutez ici les autres éléments de la carte basés sur les données du bon */}
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      {bon.type}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="mt-1 mb-2"
                    >
                      {bon.nom}
                    </Typography>
                    {/* Ajoutez d'autres éléments ici */}
                  </CardBody>
                  <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                    <Link to={bon.route}>
                      <Button variant="outlined" size="sm">
                        Voir le bon
                      </Button>
                    </Link>
                    {/* Ajoutez ici les autres éléments de pied de carte basés sur les données du bon */}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Liste de tous les bons */}
        <Card>
          <CardHeader variant="" color="gray" className="mb-8 p-6 bg-lycs">
            <Typography variant="h6" color="white">
              Tous les bons
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            {/* Utilisez une table ou une liste pour afficher tous les bons */}
            <ul>
              {bonsData.map((bon) => (
                <li key={bon.id}>
                  {/* Ajoutez ici les éléments de la liste basés sur les données du bon */}
                  <Typography variant="h6" color="blue-gray">
                    {bon.nom}
                  </Typography>
                  <Typography variant="small" className="font-normal text-blue-gray-500">
                    {bon.type}
                  </Typography>
                  {/* Ajoutez d'autres éléments ici */}
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Bon;



