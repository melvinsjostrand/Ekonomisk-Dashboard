import {
  Box,
  Show,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import Description from "./DescriptionPage";
import categoryColors from "./hooks/categoryColors";
import { BaseTableProps, Expense } from "./hooks/Inferfaces";



interface ExtendedBaseTableProps extends BaseTableProps {
  renderExtraColumn?: (payment: Expense, index: number) => React.ReactNode;
}

const BaseTable = ({
  income,
  payments,
  remaining,
  renderExtraColumn,
}: ExtendedBaseTableProps) => {
  const tableSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  const tableFontSize = useBreakpointValue({ base: "s", md: "sm", lg: "md" });
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <TableContainer>
      <Table
        variant="simple"
        size={tableSize}
        border="1px"
        borderColor="gray.200"
      >
        <Tbody>
          <Tr>
            <Th fontSize={tableFontSize}>Category</Th>
            <Th fontSize={tableFontSize}>Income {income} Kr</Th>
            {!isMobile && renderExtraColumn && (
              <Th fontSize={tableFontSize}>Manage</Th>
            )}
          </Tr>

          {payments.map((payment, index) => {
            const categoryColor = categoryColors[payment.category] || "#CCC";

            return (
              <Tr key={index}>
                <Td fontSize={tableFontSize}>
                  <Box
                    display="inline-block"
                    width="6px"
                    height="10px"
                    backgroundColor={categoryColor}
                    marginRight="8px"
                    borderRadius="md"
                  />
                  {payment.category}
                  <Show above="lg">
                    <Description
                      description={
                        payment.description || ["No description available"]
                      }
                    />
                  </Show>
                </Td>
                <Td fontSize={tableFontSize}>{payment.amount} kr</Td>
                {!isMobile && renderExtraColumn && (
                  <Td>{renderExtraColumn(payment, index)}</Td>
                )}
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th fontSize={tableFontSize}>Remaining Balance</Th>
            <Th fontSize={tableFontSize}>{remaining} Kr</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default BaseTable;
