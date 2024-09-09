import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react'
import { BsChevronDown } from 'react-icons/bs';

interface Props {
  onSelectSortOrder: (sortOrder: string) => void;
  sortOrder: string;
}

const Sorting = ({ onSelectSortOrder, sortOrder }: Props) => {
    const sortOrders = [
      { value: "", label: "Relevance" },
      { value: "Transport", label: "Transport" },
      { value: "Mat och dagligvaror", label: "Mat och dagligvaror" },
      { value: "Hälsa och välmående", label: "Hälsa och välmående" },
      { value: "Kläder och accessoarer", label: "Kläder och accessoarer" },
      { value: "Fritid och underhållning", label: "Fritid och underhållning" },
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