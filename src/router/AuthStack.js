// Rutas para usuarios NO logueados
import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Lookbook from '../pages/Lookbook';
import Shop from '../pages/Shop';
import SignIn from '../pages/SignIn';
import Adopt from '../pages/Adopt';
import Stores from '../pages/Stores'
import Faq from '../pages/Faq'
import Contact from '../pages/Contact'
import Albergue from '../pages/Albergue';
import Donation from '../pages/Donation';
import PageProto from '../components/blogCt/PageProto';
import ProductPage from '../pages/ProductPage'; 

export default function AuthStack() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/lookbook" element={<Lookbook />} />
      <Route path="/shop/*" element={<Shop />} />
      <Route path="/product/:slug" element={<ProductPage />} /> 
      <Route path="/adopt/*" element={<Adopt/>} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/stores" element={<Stores />} />
      <Route path="/faq" element={<Faq />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/blog' element={<Albergue />} />
      <Route path='/donation' element={<Donation />}/>
      <Route path='/pageproto' element={<PageProto />} />

      <Route path="*" element={<Landing />} />
    </Routes>
  );
}