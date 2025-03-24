const Market = () => {
  return (
      <>
          <table border="1" style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
              <thead>
                  <tr>
                      <th>Stock</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Select</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>AAPL</td>
                      <td>$218.27</td>
                      <td><input type="number" defaultValue="0" min="0" /></td>
                      <td><input type="checkbox" /></td>
                  </tr>
                  <tr>
                      <td>GOOGL</td>
                      <td>$166.25</td>
                      <td><input type="number" defaultValue="0" min="0" /></td>
                      <td><input type="checkbox" /></td>
                  </tr>
                  <tr>
                      <td>AMZN</td>
                      <td>$196.21</td>
                      <td><input type="number" defaultValue="0" min="0" /></td>
                      <td><input type="checkbox" /></td>
                  </tr>
              </tbody>
          </table>
      </>
  );
};

export default Market;