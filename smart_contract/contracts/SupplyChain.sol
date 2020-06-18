// SPDX-License-Identifier: MIT

pragma solidity >=0.4.21 <0.7.0;
//pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./ERC721Token.sol";

contract SupplyChain is ERC721Token, AccessControl {
    using Address for address;

    bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");
    bytes32 public constant TRANSPORT_ROLE = keccak256("TRANSPORT_ROLE");
    bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");

    address public admin;

    struct Battery {
        uint256 id;
        string manufacturer;
        bytes6 serialno;
        int16 thermal;
        bytes25 location;
        address currentOwner;
    }

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

    //mint Battery function (onlyManufacturer)
    function makeBattery(
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
            _location,
            msg.sender
        );
        nextId++;
    }

    //Only transporter
    function thermalMonitor(
        uint256 _id,
        int16 _thermal,
        bytes25 _location
    ) public onlyTransporter() onlyCurrentOwner(_id) {
        batteries[_id].thermal = _thermal;
        batteries[_id].location = _location;
    }

    function transferBattery(
        uint256 _id,
        address _to,
        int16 _thermal,
        bytes25 _location
    ) public onlyCurrentOwner(_id) {
        batteries[_id].currentOwner = _to;
        batteries[_id].thermal = _thermal;
        batteries[_id].location = _location;
        _transfer(msg.sender, _to, _id);
    }

    //Just to check the value
    function getBatteryTrackingInfo(uint256 _id)
        public
        view
        returns (
            int16,
            bytes25,
            address
        )
    {
        return (
            batteries[_id].thermal,
            batteries[_id].location,
            batteries[_id].currentOwner
        );
    }
}
