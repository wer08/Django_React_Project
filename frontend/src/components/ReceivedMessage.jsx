const ReceivedMessage = ({message}) => {
    return (  
        <div className="me-auto  ms-3 list-group-item received">
        {message.body}
        </div>
    );
}
 
export default ReceivedMessage;