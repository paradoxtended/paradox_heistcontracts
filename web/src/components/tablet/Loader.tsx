import './Loader.css';
import { locale } from "../../utils/locale";

const Loader: React.FC = () => {
    return (
        <div className="loader-anim">
            <p className="text-white text-4xl font-semibold">{locale('heist_contracts')}</p>
            <p className="text-[#9B9AA3] font-semibold text-xl">{locale('loading')}</p>
        </div>
    )
};

export default Loader;