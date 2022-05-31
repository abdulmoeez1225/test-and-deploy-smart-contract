pragma solidity ^0.4.17;

contract Inbox {
    string public message;

    function Inbox(string Initial_message) public {
        message = Initial_message;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }

    function getMessage() public view returns (string) {
        return message;
    }
}
