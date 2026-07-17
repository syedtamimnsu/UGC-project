import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import LenisScroll from './components/lenis';
import Navbar from './components/Navbar';
import SoftBackdrop from './components/SoftBackdrop';
import Community from './pages/Community';
import Generator from './pages/Generator';
import Home from './pages/Home';
import Loading from './pages/Loading';
import MyGenerations from './pages/MyGenerations';
import Plans from './pages/Plans';
import Result from './pages/Result';

function App() {
	return (
		<>
			<Toaster toastOptions={{style: {background: '#333', color: "#fff"}}} />
			<SoftBackdrop />
			<LenisScroll />
			<Navbar />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/generate' element={<Generator />} />
				<Route path='/result/:projectId' element={<Result />} />
				<Route path='/my-generations' element={<MyGenerations />} />
				<Route path='/community' element={<Community />} />
				<Route path='/plans' element={<Plans />} />
				<Route path='/loading' element={<Loading />} />
			</Routes>
			
			<Footer />
		</>
	);
}
export default App;