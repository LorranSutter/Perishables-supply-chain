// SPDX-License-Identifier: MIT

pragma solidity >=0.4.21 <0.7.0;
//pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./ERC721Token.sol";

contract SupplyChain is ERC721Token, AccessControl {
    using Address for address;
    using SafeMath for uint256;

    bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");
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
        bytes6 serialno;
        int16 thermal;
        address currentOwner;
        bytes25 location; // latitude -90.00000000 longitude -180.00000000
    }

    // mapping(address => mapping(uint256 => Battery)) public distributorToBattery;
    mapping(uint256 => Battery) public batteries;
    uint256 public nextId;

    constructor(string memory _tokenURIBase) public ERC721Token(_tokenURIBase) {
        admin = msg.sender;
    }

    modifier onlyManufacturer() {
        require(
            hasRole(MANUFACTURER_ROLE, msg.sender),
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

    modifier onlyCurrentOwner(uint256 _id) {
        require(
            msg.sender == batteries[_id].currentOwner,
            "Caller is not a the Current Owner"
        );
        _;
    }

    //Add manufacturer
    function addManufacturer(address manufacturer) public {
        require(msg.sender == admin, "only admin");
        _setupRole(MANUFACTURER_ROLE, manufacturer);
    }

    //Add transporter
    function addTransporter(address transporter) public {
        require(msg.sender == admin, "only admin");
        _setupRole(TRANSPORT_ROLE, transporter);
    }

    function addDistributor(address distributor) public {
        require(msg.sender == admin, "only admin");
        _setupRole(DISTRIBUTOR_ROLE, distributor);
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
        bytes6 _serialno,
        int16 _thermal,
        bytes25 _location
    ) public onlyManufacturer() {
        _mint(msg.sender, nextId);
        batteries[nextId] = Battery(
            nextId,
            _manufacturer,
            _serialno,
            _thermal,
            msg.sender,
            _location
        );
        nextId++;
    }

    //Only manufacturer Role
    function _startTransport(
        uint256 _id,
        address _adsTransport,
        int16 _thermal,
        bytes25 _location
    ) public onlyManufacturer() onlyCurrentOwner(_id) {
        batteries[_id].currentOwner = _adsTransport;
        batteries[_id].thermal = _thermal;
        batteries[_id].location = _location;
        _transfer(msg.sender, _adsTransport, _id);
    }

    function _changeTransporter(
        uint256 _id,
        address _newTransporter,
        int16 _thermal,
        bytes25 _location
    ) public onlyTransporter() onlyCurrentOwner(_id) {
        batteries[_id].currentOwner = _newTransporter;
        batteries[_id].thermal = _thermal;
        batteries[_id].location = _location;
        _transfer(msg.sender, _newTransporter, _id);
    }

    //Only transporter
    function _thermalMonitor(
        uint256 _id,
        int16 _thermal,
        bytes25 _location
    ) public onlyTransporter() onlyCurrentOwner(_id) {
        batteries[_id].thermal = _thermal;
        batteries[_id].location = _location;
        _transfer(msg.sender, msg.sender, _id);
    }

    //Only Transporter Should call
    function _endofTransportation(
        uint256 _id,
        address _distAddress,
        int16 _thermal,
        bytes25 _location
    ) public onlyTransporter() onlyCurrentOwner(_id) {
        batteries[_id].currentOwner = _distAddress;
        batteries[_id].thermal = _thermal;
        batteries[_id].location = _location;
        _transfer(msg.sender, _distAddress, _id);
    }

    //Just to check the value
    function getBatteryThermal(uint256 _id)
        public
        view
        onlyDistributor()
        returns (int16)
    {
        return (batteries[_id].thermal);
    }

    function getBatteryLocation(uint256 _id)
        public
        view
        onlyDistributor()
        returns (bytes25)
    {
        return (batteries[_id].location);
    }

    function getBatteryCurrentOwner(uint256 _id)
        public
        view
        onlyDistributor()
        returns (address)
    {
        return (batteries[_id].currentOwner);
    }

    // //Just to check the value
    // function getBatteryInfo(uint256 _id)
    //     public
    //     view
    //     returns (
    //         string memory,
    //         bytes6,
    //         int16,
    //         address,
    //         bytes25
    //     )
    // {
    //     return (
    //         batteries[_id].manufacturer,
    //         batteries[_id].serialno,
    //         batteries[_id].thermal,
    //         batteries[_id].currentOwner,
    //         batteries[_id].location
    //     );
    // }
}
