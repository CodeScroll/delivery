import { constTrans, fetchSource, handleAjaxError } from '@/api';
import { useEffect, useState } from 'react';

export default function CitiesList({ targetCity, setTargetCity }) {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);

    const citySelected = (city) => {
        setSelectedCity(city);
        setTargetCity(city);
        getCities(city.id);
    };

    const clearSelectedCity = () => {
        if (selectedCity.parent != null) {
            getCities(selectedCity.parent, true);
        } else {
            setSelectedCity(null);
            setTargetCity(null);
            getCities();
        }
    };

    const transes = {
        el: {
            cities: 'Πόλεις',
            selectcity: 'Επιλογή πόλης',
            selectedcity: 'Επιλεγμένη πόλη',
            allcities: 'Όλες οι πόλεις',
        },
    };

    const getCities = (cityId = null, parent = false) => {
        let url = '/api/cities';

        const params = new URLSearchParams();

        if (cityId) {
            params.append('cityid', cityId);
        }

        if (parent) {
            params.append('parent', 1);
        }

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        fetchSource(url)
            .then((data) => {
                if (data.length > 0) {
                    setCities(data);
                    if (parent) {
                        parentsCity = data.find((item) => item.id === cityId);
                        setSelectedCity(parentsCity);
                        setTargetCity(parentsCity);
                    }
                }
            })
            .catch(handleAjaxError);
    };

    useEffect(() => {
        getCities();
    }, []);

    return (
        <div className="flex min-h-screen bg-slate-950 p-8 font-mono">
            <div className="flex w-full gap-6">
                <div className="w-full rounded-lg bg-slate-900 p-6 text-white">
                    <div className="text-center">
                        <h2 className="mb-1 text-xs uppercase tracking-[0.3em] text-slate-500">{constTrans(transes, 'cities')}</h2>
                        {targetCity !== null && (
                            <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 mt-2">
                                <span className="text-xs font-medium text-blue-500">{constTrans(transes, 'selectedcity')}</span>
                                <span className="text-xs font-semibold text-blue-700">{targetCity.name}</span>
                            </div>
                        )}
                        <h1 className="text-2xl mt-2 font-bold tracking-tight text-white">{constTrans(transes, 'selectcity')}</h1>
                    </div>

                    <div className="relative">
                        <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-6 bg-gradient-to-b from-slate-950 to-transparent" />
                        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-6 bg-gradient-to-t from-slate-950 to-transparent" />

                        <ul className="scrollbar-thin h-80 space-y-1 overflow-y-auto py-4 pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1">
                            {cities.map((city) => {
                                const isSelected = selectedCity?.id === city.id;
                                return (
                                    <li key={city.id}>
                                        <button
                                            onClick={() => citySelected(city)}
                                            className={`group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-all duration-150 ${
                                                isSelected
                                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                                                    : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'
                                            }`}
                                        >
                                            <div className="flex min-w-0 flex-col">
                                                <span className={`truncate text-sm font-semibold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                                                    {city.name}
                                                </span>
                                            </div>
                                            {isSelected && <span className="ml-auto text-xs text-indigo-200">✓</span>}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div
                        className={`flex w-full justify-center py-4 text-xs transition-all duration-300 ${selectedCity ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <span className="text-slate-500">{ti8c('selected_h')}: </span>
                        <span className="font-semibold text-indigo-400">{selectedCity?.name}</span>
                        {selectedCity && (
                            <button
                                onClick={clearSelectedCity}
                                className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/40"
                                aria-label="Clear selected city"
                            >
                                {selectedCity.parent == null ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3 w-3 text-white"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3 w-3 text-white"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="15 18 9 12 15 6" />
                                    </svg>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
