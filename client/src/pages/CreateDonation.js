import { toast } from "react-toastify";
import DonationForm from "../components/DonationForm";

export default function CreateDonation() {
    return (
        <div className="max-w-5xl mx-auto p-6">
            <DonationForm onCreated={() => toast.success("Donation created")} />
        </div>
    );
}
