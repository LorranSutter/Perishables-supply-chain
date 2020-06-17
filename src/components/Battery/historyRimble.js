import React from 'react';
import { Table } from 'rimble-ui';
import { Heading } from "rimble-ui";

const HistoryTable = React.memo((props) => {
    return  (
        <div>
          <Heading mb={2}>Battery Track</Heading>
           <Table>
              <thead>
                  <tr>
                  <th>Serial Number</th>
                  <th>Holder</th>
                  <th>Location</th>
                  <th>Thermal</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                  <td>0xeb...cc0</td>
                  <td>Manufacturer</td>
                  <td>43.653225 / -79.383186</td>
                  <td>18 C</td>
                  </tr>
                  <tr>
                  <td>0xsb...230</td>
                  <td>Transporter</td>
                  <td>20.232335 / -40.343432</td>
                  <td>26 C</td>
                  </tr>
                  <tr>
                  <td>0xed...c40</td>
                  <td>Distributer</td>
                  <td>10.232335 / -20.343432</td>
                  <td>20 C</td>
                  </tr>
              </tbody>
          </Table>
        </div>
    )
  
});

export default HistoryTable;