import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { constTrans } from "@/api";

export default function RegisterForm({ forceRole = null, forceData = null }) {
    const transes = {
        el: {
            register: "Εγγραφή",
            registerascomp: "Εγγραφή ως εταιρείας",
            name: "Όνομα",
            surname: "Επώνυμο",
            password: "Κωδικός",
            passwordconf: "Επιβεβαίωση κωδικού",
            alreadyregister: "ήδη εγγεγραμμένος",
        },
    };

    const params = new URLSearchParams(window.location.search);
    const requestedRole = params.get("role");
    let role = requestedRole == "company" ? "company" : "client";

    if (forceRole) {
        role = forceRole;
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        surname: "",
        phone: "",
        role: role,
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        setData("role", role);

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    useEffect(() => {
        if (typeof forceData === "object" && forceData !== null) {
            setData("name", forceData.name);
            setData("surname", forceData.surname);
            setData("email", forceData.email);
            setData("invuid", forceData.uid);
            setData("invcode", forceData.invcode);
        }
    }, []);

    return (
        <>
            <form onSubmit={submit}>
                <div>
                    <InputLabel
                        htmlFor="name"
                        value={constTrans(transes, "name")}
                        className="text-left"
                    />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="surname"
                        value={constTrans(transes, "surname")}
                        className="text-left"
                    />

                    <TextInput
                        id="surname"
                        name="surname"
                        value={data.surname}
                        className="mt-1 block w-full"
                        autoComplete="surname"
                        onChange={(e) => setData("surname", e.target.value)}
                        required
                    />

                    <InputError message={errors.surname} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="email"
                        value={role == "company" ? "Company Email" : "Email"}
                        className="text-left"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                {role == "company" && (
                    <div className="mt-4">
                        <InputLabel
                            htmlFor="email"
                            value={ti8c('phone')}
                            className="text-left"
                        />

                        <TextInput
                            id="phone"
                            type="phone"
                            name="phone"
                            value={data.phone}
                            className="mt-1 block w-full"
                            autoComplete="phone"
                            onChange={(e) => setData("phone", e.target.value)}
                            required
                        />

                        <InputError message={errors.phone} className="mt-2" />
                    </div>
                )}

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password"
                        value={constTrans(transes, "password")}
                        className="text-left"
                    />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value={constTrans(transes, "passwordconf")}
                        className="text-left"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route("login")}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    >
                        {constTrans(transes, "alreadyregister")}
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        {constTrans(transes, "register")}
                    </PrimaryButton>
                </div>

                <div className="mt-4">
                    <Link
                        href={route("register", { role: "company" })}
                        className="rounded-md text-sm text-rose-500 underline hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    >
                        {constTrans(transes, "registerascomp")}
                    </Link>
                </div>
            </form>
        </>
    );
}
