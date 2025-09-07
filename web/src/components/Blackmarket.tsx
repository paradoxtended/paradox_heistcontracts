import { Items } from "../store/items";
import { locale } from "../utils/locale";

const formatPrice = (coins?: number, money?: number) => {
  const moneyStr = money && `$${money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: false })}`;
  const coinsStr = coins && `${coins.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: false })} C`;

  return moneyStr && coinsStr ? `${moneyStr} & ${coinsStr}` : moneyStr || coinsStr || locale('free');
};

const Blackmarket: React.FC = () => {
    return (
        <div>
            <div className="blackmarket-list">
                {Items && Object.entries(Items).map(([key, item], id) => {
                    if (!item) return null; // safeguard against undefined
                    const status = item.count === undefined || item.count > 0 ? 'available' : 'unavailable';
                    const price = typeof item.price === 'object' ? formatPrice(item.price?.coins, item.price?.money) : formatPrice(undefined, item.price);

                    return (
                        <div className="blackmarket-item" key={`blackmarket-item-${id}`}>
                            <div className="font-[Courier] text-[#a7a7ff] flex justify-between items-start">
                                <div>
                                    <p className="text-xs">ID: {String(id + 1).padStart(3, '0')}</p>
                                    <p className="font-bold text-lg leading-tight">{item.label}</p>
                                    <p className="text-xs text-[#6b6bc4]">QTY: {item.count ?? '∞'}</p>
                                </div>
                                
                                <p className="uppercase text-[13px] px-1.5 bg-[#a7a7ff25] border border-[#565699] rounded">[{locale(status)}]</p>
                            </div>

                            <div className="w-full flex items-center justify-center">
                                <img src={item.image} className="w-[90px] h-[90px] border-2 border-[#4747aa] p-3" />
                            </div>

                            {item.description && <p className="text-center text-sm text-[#8c8cb8]">{item.description}</p>}

                            <div className="border-b border-[#4747aa]"></div>

                            <div className="font-[Courier] text-[#a7a7ff] uppercase text-sm flex items-center justify-between">
                                <p>{locale('price')}:</p>
                                <p className="font-black">{price}</p>
                            </div>

                            <button className="font-[Courier] uppercase text-sm border border-[#4747aa] py-1.5 text-[#a7a7ff] bg-[#a7a7ff10] duration-300
                                hover:bg-[#a7a7ff20]">
                                [{locale('purchase_item')}]
                            </button>
                        </div>
                    )
                })}
            </div>

            <div className="blackmarket-contact">
                <div className="blackmarket-details">
                    <p className="font-medium">{locale('contact_dealer')}</p>
                    <p className="text-gray-400 text-sm">{locale('contact_dealer_description')}</p>
                </div>

                <button className="main-button"><div className="flex items-center gap-[10px]">
                    <i className="fa-solid fa-user-secret"></i>
                    {locale('contact_dealer')}
                </div></button>
            </div>
        </div>
    )
};

export default Blackmarket;