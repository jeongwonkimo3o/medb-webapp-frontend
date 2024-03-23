
interface DrugFAQProps {
  title: string;
  content: string | null | undefined;
}

const DrugFAQ = ({ title, content }: DrugFAQProps): JSX.Element => {
  return (
    <div className="space-y-4 mb-6">
      <details className="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
          <h2 className="font-medium text-lg text-blue-800">
            {title}
          </h2>

          <span className="relative h-5 w-5 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 opacity-100 group-open:opacity-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 opacity-0 group-open:opacity-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        </summary>

        <div className="mt-4 leading-relaxed text-gray-700 text-left"> {/* 내용 좌측 정렬 */}
          {content ? content : "해당 정보가 없습니다."}
        </div>
      </details>
    </div>
  );
};

export default DrugFAQ;
