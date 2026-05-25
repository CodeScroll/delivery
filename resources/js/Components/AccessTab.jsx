import { useState } from "react";
import RegisterForm from '@/Components/RegisterForm'
import LoginForm from '@/Components/LoginForm'

export default function AccessTab() {
    const [activeTab, setActiveTab] = useState("login");

    return (
        <div className="w-full mx-auto mt-10 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6">

            <div className="flex border-b border-gray-300 dark:border-gray-700">
                <button
                    className={`flex-1 py-2 text-center font-semibold ${activeTab === "login"
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-500 dark:text-gray-300"
                        }`}
                    onClick={() => setActiveTab("login")}
                >
                    {ti8c('login')}
                </button>

                <button
                    className={`flex-1 py-2 text-center font-semibold ${activeTab === "register"
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-500 dark:text-gray-300"
                        }`}
                    onClick={() => setActiveTab("register")}
                >
                    {ti8c('register')}
                </button>
            </div>

            <div className="mt-6">
                {activeTab === "login" && (
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                            {ti8c('login')}
                        </h2>

                        <LoginForm></LoginForm>
                    </div>
                )}

                {activeTab === "register" && (
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                            {ti8c('register')}
                        </h2>

                        <RegisterForm></RegisterForm>
                    </div>
                )}
            </div>
        </div>
    );
}
