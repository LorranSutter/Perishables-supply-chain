// SPDX-License-Identifier: MIT

pragma solidity >=0.4.21 <0.7.0;
//pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./ERC721Token.sol";

contract SupplyChain is ERC721Token, AccessControl {
    using Address for address;
    using SafeMath for uint256;

    bytes32 public constant FACTORY_ROLE = keccak256("FACTORY_ROLE");
    bytes32 public constant TRANSPORT_ROLE = keccak256("TRANSPORT_ROLE");
    bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");

    address public admin;
    //Distributor's state variable
    address payable public toFactory;
    uint256 battQty;
    bool success;

    struct Battery {
        uint256 id;
        string manufacturer;
        string serialno;
        uint256 thermal;
        address currentOwner;
        string location;
        uint256 time;
    }

    mapping(uint256 => Battery) public batteries;
    uint256 public nextId;

    constructor(string memory _tokenURIBase) public ERC721Token(_tokenURIBase) {
        admin = msg.sender;
    }

    event ManufacturerAdded(address _manufacturer);
    event TransporterAdded(address _transporter);
    event DistributorAdded(address _distributor);

    modifier onlyManufacturer() {
        require(
            hasRole(FACTORY_ROLE, msg.sender),
            "Caller is not a Manufacturer"
        );
        _;
    }

    modifier onlyTransporter() {
        require(
            hasRole(TRANSPORT_ROLE, msg.sender),
            "Caller is not a Transporter"
        );
        _;
    }

    modifier onlyDistributor() {
        require(
            hasRole(DISTRIBUTOR_ROLE, msg.sender),
            "Caller is not a Distributor"
        );
        _;
    }

    //Add manufacturer
    function addManufacturer(address manufacturer) public {
        require(msg.sender == admin, "only admin");
        _setupRole(FACTORY_ROLE, manufacturer);
        emit ManufacturerAdded(manufacturer);
    }

    //Add transporter
    function addTransporter(address transporter) public {
        require(msg.sender == admin, "only admin");
        _setupRole(TRANSPORT_ROLE, transporter);
        emit TransporterAdded(transporter);
    }

    function addDistributor(address distributor) public {
        require(msg.sender == admin, "only admin");
        _setupRole(DISTRIBUTOR_ROLE, distributor);
        emit DistributorAdded(distributor);
    }

    //Distributor Deposit money to order the battery by next function
    function deposit() public payable onlyDistributor {}

    // Distributor Order battery (Only Distribiutor Role can call this function)
    function _orderBattery(
        address payable to,
        uint256 qty,
        uint256 advPrice
    ) public payable onlyDistributor() {
        to.transfer(advPrice);
        battQty = qty;
    }

    //distributor recieved the battery and pays balance amount (onlyDistributor)
    function _acceptBattery(address payable to, uint256 balPrice)
        public
        onlyDistributor()
        returns (bool)
    {
        to.transfer(balPrice);
        success = true;
    }

    //mint Battery function (onlyManufacturer)
    function _makeBattery(
        string memory _manufacturer,
        string memory _serialno,
        uint256 _thermal,
        string memory _location
    ) public onlyManufacturer() {
        batteries[nextId] = Battery(
            nextId,
            _manufacturer,
            _serialno,
            _thermal,
            msg.sender,
            _location,
            now
        );
        _mint(msg.sender, nextId);
        nextId++;
    }

    //Only manufacturer Role
    function _startTransport(
        uint256 _id,
        uint256 _thermal,
        address _adsTransport,
        string memory _location
    ) public onlyManufacturer() {
        batteries[_id].currentOwner = _adsTransport;
        batteries[_id].thermal = _thermal;
        batteries[_id].location = _location;
        batteries[_id].time = now;
        _transfer(msg.sender, _adsTransport, _id);
    }

    //Just to check the value
    function getBattery(uint256 _id)
        public
        view
        returns (
            string memory,
            uint256,
            address
        )
    {
        return (
            batteries[_id].manufacturer,
            batteries[_id].thermal,
            batteries[_id].currentOwner
        );
    }

    //Only transporter
    function _thermalMonitor(
        uint256 _id,
        string memory _location,
        uint256 _thermal
    ) public onlyTransporter() {
        batteries[_id].thermal = _thermal;
        batteries[_id].location = _location;
        batteries[_id].time = now;
        _transfer(msg.sender, msg.sender, _id);
    }

    //Only Transporter Should call
    function _endofTransportation(
        uint256 _id,
        address _distAddress,
        string memory _location,
        uint256 _thermal
    ) public onlyTransporter() {
        batteries[_id].currentOwner = _distAddress;
        batteries[_id].thermal = _thermal;
        batteries[_id].location = _location;
        batteries[_id].time = now;
        _transfer(msg.sender, _distAddress, _id);
    }
}
