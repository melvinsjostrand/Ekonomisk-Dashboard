import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Tr,
} from "@chakra-ui/react";

interface BaseTableProps {
  sum: number;
  payments: pay[];
  remaining: number;
  renderExtraColumn?: (payment: pay, index: number) => React.ReactNode; // Optional extra column rendering
}

export interface pay {
  category: string;
  amount: number;
}

const BaseTable: React.FC<BaseTableProps> = ({
  sum,
  payments,
  remaining,
  renderExtraColumn,
}) => {
  return (
    <TableContainer>
      <Table variant="simple" size="lg" border="1px" borderColor="gray.200">
        <Tbody>
          <Tr>
            <Th>Category</Th>
            <Th>Total Sum {sum}</Th>
            {renderExtraColumn && <Th>Actions</Th>}
          </Tr>

          {payments.map((payment, index) => (
            <Tr key={index}>
              <Td>{payment.category}</Td>
              <Td>{payment.amount}</Td>
              {renderExtraColumn && (
                <Td>{renderExtraColumn(payment, index)}</Td>
              )}
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Remaining Balance</Th>
            <Th>{remaining}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default BaseTable;
