
const Table = ({ data, columns }: any) => {
  // if (className) {
  //   tableClassName = `${tableClassName} ${className}`;
  // }

  const rows = [...new Array(data.length)].map((item, index) => {
    return columns.map(({ columnId }: any) => data[index][columnId]);
  });

  return (
    <table>
      <thead>
        <tr>
          {columns.map(({ columnId, Header }: any) => {
            return <td key={columnId}>{Header}</td>;
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          return (
            <tr key={index}>
              {row.map((cell: any, index: any) => {
                return <td key={index}>{cell}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
