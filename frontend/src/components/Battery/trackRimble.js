import React from 'react';
import { Table } from 'rimble-ui';
import { Heading } from "rimble-ui";
// Some elements
import { EthAddress, Image, MetaMaskButton, QR } from "rimble-ui";

const HistoryTable = React.memo((props) => {
    return  (
        <div>
          {<Heading mb={2}>Update</Heading> }
           <Table>
              <thead>
                  <tr>
                  <th>Serial Number</th>
                  <th>Address</th>
                  <th>Holder</th>
                  <th>Location</th>
                  <th>Thermal</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                  <td>89129394</td>
                  <td>0xeb...cc0</td>
                  <td>Manufacturer</td>
                  <td>43.653225 / -79.383186</td>
                  <td>18 C</td>
                  </tr>
                  <tr>
                  <td>86362362</td>
                  <td>0xsb...230</td>
                  <td>Transporter</td>
                  <td>20.232335 / -40.343432</td>
                  <td>26 C</td>
                  </tr>
                  <tr>
                  <td>85362727</td>
                  <EthAddress address="0x9505C8Fc1aD98b0aC651b91245d02D055fEc8E49" />
                  <td>Distributer</td>
                  <td>10.232335 / -20.343432</td>
                  <td>20 C</td>
                  </tr>
              </tbody>
          </Table>
          <p>Elements, maybe use</p>
          <EthAddress address="0x9505C8Fc1aD98b0aC651b91245d02D055fEc8E49" />
          <EthAddress address="0x9505C8Fc1aD98b0aC651b91245d02D055fEc8E49" textLabels />
        </div>
    )
  
});

export default HistoryTable;