import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import SelectInput from "@/Components/SelectInput.jsx";

export default function UpdatePizzaOrderForm({ pizza, className = " " }) {

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        size: pizza.size,
        crust: pizza.crust,
        toppings: pizza.toppings.join(", "),
        status: pizza.status
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route("pizzas.update", pizza.id), {
            preserveScroll: true
        });
    };

    const statusOptions = [
        "Ordered",
        "Prepping",
        "Baking",
        "Checking",
        "Ready"
    ];

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-grey-900">Order Information</h2>

                <p className="mt-1 text-sm text-grey-600">
                    View and change information associated with this order.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="size" value="Size" />

                    <TextInput id="size" className="mt-1 block w-full" value={data.size} disabled></TextInput>

                </div>

                <div>
                    <InputLabel htmlFor="crust" value="Crust" />

                    <TextInput id="crust" className="mt-1 block w-full" value={data.crust} disabled></TextInput>

                </div>

                <div>
                    <InputLabel htmlFor="toppings" value="toppings" />

                    <TextInput id="name" className="mt-1 block w-full" value={data.toppings} disabled></TextInput>

                </div>

                <div>
                    <InputLabel htmlFor="status" value="Status" />

                    <SelectInput id="status" className="mt-1 block w-full" options={statusOptions} value={data.status} onChange={(e) => setData("status", e.target.value)}></SelectInput>
                    <InputError className="mt-2" message={errors.status}></InputError>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save Changes</PrimaryButton>
                    <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
                        <p className="text-sm text-grey-600">Saved</p>
                    </Transition>
                </div>
            </form>
        </section >
    )
}