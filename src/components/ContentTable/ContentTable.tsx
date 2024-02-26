import { Link } from "react-router-dom";

const ContentTable = (): JSX.Element => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              분류번호
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              이름
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              간략 설명
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 ">
          <tr className="odd:bg-white">
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              John Doe
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700 cursor-pointer hover:underline">
              <Link to="/detail">까스활명수</Link>
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              Web Developer
            </td>
          </tr>
        </tbody>

        <tbody className="divide-y divide-gray-200 ">
          <tr className="odd:bg-white">
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              John Doe
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              24/05/1995
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              Web Developer
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ContentTable;
