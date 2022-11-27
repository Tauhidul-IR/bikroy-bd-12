import React from 'react';

const ConfirmModal = ({ title, closeModal, handleDeleteUser, modalDAta }) => {
    return (
        <div>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{ }</p>
                    <div className="modal-action">
                        <label onClick={() => { handleDeleteUser(modalDAta) }} htmlFor="confirmation-modal" className="btn btn-outline">Yes</label>
                        <button onClick={closeModal} className='btn btn-outline'>cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;