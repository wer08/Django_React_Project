const ReceivedMessage = ({message}) => {
    return (  
        <div 
            className="me-auto  ms-3 received p-2"
            data-bs-toggle="tooltip" data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title={message.date_of_creation}>
            {message.body}
        </div>
    );
}
 
export default ReceivedMessage;