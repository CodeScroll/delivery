import AccessTab from '../AccessTab';
import GoogleLoginButton from '../GoogleLoginButton';
import Modal from '../Modal';
import { constTrans } from "@/api";

export default function AccessModal({ open, onClose, pageUrl }) {
    if (!open) return null;

    const transes = {
        el: {
            access: 'Πρόσβαση',
        },
    };

    return (
        <div>
            <Modal show={open} onClose={onClose}>
                <h2 className="text-lg font-semibold">{constTrans(transes, "access")}</h2>
                <AccessTab></AccessTab>
                <div className="mt-5 w-full border-t border-gray-300 pt-4">
                    <GoogleLoginButton redirectto={pageUrl} />
                </div>
            </Modal>
        </div>
    );
}
