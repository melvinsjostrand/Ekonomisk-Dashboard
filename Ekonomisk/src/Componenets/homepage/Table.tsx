import { Table, TableContainer, Tbody, Td, Tfoot, Th, Tr } from '@chakra-ui/react';


interface Props {
  sum: number;
  payments: pay[];
  totalSpent: number;
  remaining: number;
}

interface pay {
  category: string;
  amount: number
}


const Tables = ({sum, payments, remaining }: Props) => {
  return (
    <TableContainer>
      <Table variant="simple" size="lg" border="1px" borderColor="gray.200">
        <Tbody>
          <Tr>
            <Th>Category</Th>
            <Th>Total Sum {sum}</Th>
          </Tr>

          {payments.map((payment, index) => (
            <Tr key={index}>
              <Td>{payment.category}</Td>
              <Td>{payment.amount}</Td>
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
}

export default Tables