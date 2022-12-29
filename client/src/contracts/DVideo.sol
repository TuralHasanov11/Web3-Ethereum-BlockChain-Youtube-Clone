pragma solidity ^0.8.4;

contract DVideo {
    uint public videoCount = 0;
    string public name = "DVideo";

    struct Video {
        uint id;
        string hash;
        string title;
        string description;
        uint likes;
        address owner;
    }

    mapping(uint => Video) public videos;

    event VideoUploaded(
        uint id,
        string hash,
        string title,
        string description,
        uint likes,
        address owner
    );

    event VideoLiked(
        uint id,
        string hash,
        string title,
        string description,
        uint likes,
        address owner
    );

    constructor() {}

    function uploadVideo(
        string memory _hash,
        string memory _title,
        string memory _description
    ) public payable {
        require(
            bytes(_title).length > 0 &&
                bytes(_hash).length > 0 &&
                msg.sender != address(0)
        );

        videoCount++;
        videos[videoCount] = Video(
            videoCount,
            _hash,
            _title,
            _description,
            0,
            msg.sender
        );

        emit VideoUploaded(
            videoCount,
            _hash,
            _title,
            _description,
            0,
            msg.sender
        );
    }

    function likeVideo(uint _id) public payable {
        require(_id > 0 && _id <= videoCount);

        Video memory video = videos[_id];

        require(msg.sender != video.owner);

        payable(address(video.owner)).transfer(msg.value);

        video.likes++;

        videos[_id] = video;

        emit VideoLiked(
            video.id,
            video.hash,
            video.title,
            video.description,
            video.likes,
            video.owner
        );
    }
}
