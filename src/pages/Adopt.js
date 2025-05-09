import { Title } from '../components/common/TitleCp';
import MascotasList from '../components/adoptionCp/MascotasList';
import MascotaDetail from '../components/adoptionCp/MascotaDetail';
import { AdoptionDescription, CallToAction } from '../components/adoptionCp/Adoption';
import { Routes, Route } from 'react-router-dom';

const Adopt = () => {
  return (
    <div className="container">
      <Title title="Adopta" />
      <AdoptionDescription />
      
      <Routes>
        <Route path="/" element={<MascotasList />} />
        <Route path="/:slug" element={<MascotaDetail />} />
      </Routes>
      
      <div className="mascotas-footer">
        <CallToAction />
      </div>
    </div>
  );
};

export default Adopt;