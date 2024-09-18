import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';

interface Props {
  onSelectSortOrder: (sortOrder: string) => void;
  sortOrder: string;
}

const Sorting = ({ onSelectSortOrder, sortOrder }: Props) => {
    const sortOrders = [
      { value: "", label: "Relevance" },
      { value: "Housing", label: "Housing" },
      { value: "Transport", label: "Transport" },
      { value: "Food", label: "Food" },
      { value: "Health", label: "Health" },
      { value: "Entertainment", label: "Entertainment" },
      { value: "Accessories", label: "Accessories" },
      { value: "Other", label: "Other"}
    ];

      const currentSortOrder = sortOrders.find(
        (order) => order.value === sortOrder
      );

      return (
        <Menu>
          <MenuButton as={Button} rightIcon={<BsChevronDown />}>
            Order by: {currentSortOrder?.label || "Relevance"}
          </MenuButton>
          <MenuList>
            {sortOrders.map((order) => (
              <MenuItem
                onClick={() => onSelectSortOrder(order.value)}
                key={order.value}
                value={order.label}
              >
                {order.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      );
};

export default Sorting