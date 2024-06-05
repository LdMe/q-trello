import { useState } from "react";
import { acceptInvitation, rejectInvitation } from "../../utils/fetch";
import Confirm from "../confirm/Confirm";
import "./Invitations.css";
const Invitations = ({ invitations, onRemove }) => {
    const [showInvitations, setShowInvitations] = useState(false);
    async function handleAccept(invitation) {
        const result = await acceptInvitation(invitation._id);
        if (!result.error) {
            onRemove(invitation);
        }
    }

    async function handleReject(invitation) {
        const result = await rejectInvitation(invitation._id);
        if (!result.error) {
            onRemove(invitation);
        }
    }
    return (
        <section className="invitations">
            <h2>Invitations | {invitations?.received?.length}</h2>
            <button onClick={() => setShowInvitations(!showInvitations)}>
                {showInvitations ? "Hide" : "Show"}
            </button>
            {showInvitations && invitations &&
                <>
                    <section className="sent-invitations">
                        <h3>Sent invitations</h3>
                        {invitations.sent.map(invitation => {
                            return (
                                <article key={invitation._id}>
                                    <p>To: {invitation.to.username}</p>
                                    <p>Project: {invitation.project.name}</p>
                                </article>
                            )
                        })}
                    </section>
                    <section className="sent-invitations">
                        <h3>Received invitations</h3>
                        {invitations.received.map(invitation => {
                            return (
                                <article key={invitation._id}>
                                    <p>From: {invitation.from.username}</p>
                                    <p>Project: {invitation.project.name}</p>
                                    <section className="buttons">
                                        <Confirm
                                            title="Accept"
                                            message="Are you sure you want to accept this invitation?"
                                            onConfirm={() => handleAccept(invitation)}
                                            onCancel={() => console.log("cancel")}
                                        />
                                        <Confirm
                                            title="Decline"
                                            message="Are you sure you want to decline this invitation?"
                                            onConfirm={() => handleReject(invitation)}
                                            onCancel={() => console.log("cancel")}
                                        />
                                    </section>
                                </article>
                            )
                        })}
                    </section>
                </>

            }

        </section >
    );
};
export default Invitations