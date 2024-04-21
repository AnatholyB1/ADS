import React from 'react';

const Home: React.FC = () => {
    return (
        <section className="h-screen w-screen grid place-items-center bg-black/80 text-white text-center px-[2rem]">
            <h1 className="text-2xl">BIENVENU SUR MON PROJET DE RECHERCHE: <br />Comparaison des méthodes d'ointégration de model 3D dans le web pour différents secteur d'utilisation</h1>
            <p>Ce site est dédié à l'intégration et au test de différents modèles 3D, servant de plateforme pratique pour évaluer directement la performance, la facilité d'intégration et l'expérience utilisateur de diverses technologies de rendu 3D dans un environnement web réel.</p>
        </section>
    );
};

export default Home;