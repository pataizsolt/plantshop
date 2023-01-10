import React from 'react'
import { MdClose } from 'react-icons/md'

const BranchCategory = (props) => {
    return (
        <tr class="border-b bg-gray-50">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {props.category.id}
            </th>
            <td class="px-6 py-4">
                {props.category.branchCategoryName}
            </td>
            <td class="px-6 py-4 text-right">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">...</a>
            </td>

            <td class="px-6 py-4">
                <button onClick={props.handleClick} ><MdClose /></button>
            </td>

        </tr>
    )
}

export default BranchCategory