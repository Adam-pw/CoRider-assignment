import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [info, SetInfo] = useState<any>();
  const [onClick, setClick] = useState<any>(false);
  const [number, setNumber] = useState(0);

  const lastChatRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);

  useEffect(() => {
    fetch(`https://3.111.128.67/assignment/chat?page=${number}`)
      .then((res: any) => res.json())
      .then((res: any) => {
        setData([...res.chats, ...data]);
        if (!info) {
          SetInfo(res);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    const handleScroll = () => {
      const divElement = chatContainerRef.current;
      if (divElement) {
        if ((divElement as any).scrollTop === 0) {
          setNumber((prevPage) => prevPage + 1);
        }
      }
    };
    (chatContainerRef.current as any).addEventListener("scroll", handleScroll);
    return () => {
      (chatContainerRef.current as any).removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [number]);

  const habdleScrollInto = () => {
    if (shouldScrollToBottom && lastChatRef.current) {
      (lastChatRef.current as any).scrollIntoView({
        behavior: "instant",
      });
      setShouldScrollToBottom(false);
    }
  };

  useEffect(() => {
    habdleScrollInto();
  }, []);

  const inputDate = new Date(data[0]?.time);
  const options: any = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = inputDate.toLocaleDateString("en-US", options);

  return (
    <>
      <div className="flex">
        <div className="w-full fixed z-10">
          <div className="bg-[#FAF9F4] p-4 w-full">
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <Image src="/images/Icon.svg" alt="" height={20} width={20} />
                <div className="text-2xl font-medium">{info?.name}</div>
              </div>
              <Image src="/images/Icon-1.svg" alt="" height={20} width={20} />
            </div>
            <div className="mt-6 flex justify-between items-center pr-2">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/Profile.svg"
                  alt=""
                  height={48}
                  width={48}
                />
                <div className="">
                  <div className="text-[#141E0D] font-medium">
                    <span className="text-[#606060] font-normal">From</span>{" "}
                    {info?.from}
                  </div>
                  <div className="text-[#141E0D] font-medium">
                    <span className="text-[#606060] font-normal">To</span>{" "}
                    {info?.to}
                  </div>
                </div>
              </div>
              <Image src="/images/Icon-2.svg" alt="" height={5} width={5} />
            </div>
          </div>
          <hr className="w-full border-[#E5E5E0]"></hr>
        </div>
        <div
          className=" bg-[#FAF9F4] p-4 w-full mt-[124px] mb-[54px] h-[710px] overflow-y-auto"
          ref={chatContainerRef}
        >
          <div className="flex justify-between items-center my-4">
            <div className="h-[1px] bg-[#B7B7B7] w-[116px]"></div>
            <div className="text-[#B7B7B7] text-xs">{formattedDate}</div>
            <div className="w-[116px] h-[1px] bg-[#B7B7B7]"></div>
          </div>
          <div className="flex flex-col gap-4 relative">
            {data?.map((value: any, index: any) => {
              return (
                <>
                  {value.sender.self === true ? (
                    <>
                      <div
                        className="px-4 py-2 self-end bg-[#1C63D5] text-white w-[287px] shadow-[0_4px_8px_1px_rgba(0,0,0,0.08)] rounded-tr-xl rounded-tl-xl rounded-bl-xl"
                        key={index}
                        // ref={index === 9 ? lastChatRef : null}
                      >
                        {value?.message}
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="flex gap-2 mt-4"
                        key={index}
                        // ref={index === 9 ? lastChatRef : null}
                      >
                        <div className="w-[26px] h-[26px]">
                          <Image
                            className="rounded-full w-[26px] h-[26px]"
                            src={value?.sender.image}
                            alt=""
                            height={26}
                            width={26}
                          />
                          {value?.sender.is_kyc_verified && (
                            <>
                              <div className="absolute ">
                                <Image
                                  className="rounded-full w-[12px] h-[12px] -translate-y-2 translate-x-4"
                                  src="/images/verified.svg"
                                  height={8}
                                  alt=""
                                  width={8}
                                />
                              </div>
                            </>
                          )}
                        </div>
                        <div className="bg-[#FFFFFF] px-4 py-2 shadow-[0_4px_8px_1px_rgba(0,0,0,0.08)] text-[#606060] rounded-r-xl rounded-b-xl rounde-l-xl w-[287px]">
                          {value?.message}
                        </div>
                      </div>
                    </>
                  )}
                </>
              );
            })}
            <div className="" ref={lastChatRef}></div>
          </div>
        </div>
        <div className="bg-[#FAF9F4] fixed bottom-0 flex w-full justify-between items-center">
          <input
            className="w-96 focus:outline-none border-0 my-2 mx-4 py-2 px-4"
            placeholder="Reply to @Rohit Yadav"
          ></input>
          <div className="py-4 px-4 flex gap-4 absolute right-4">
            <Image
              src="/images/Icon-3.svg"
              alt=""
              height={20}
              width={20}
              onClick={() => setClick(!onClick)}
            />
            <Image src="/images/Icon-4.svg" alt="" height={20} width={20} />
          </div>
          {onClick && (
            <>
              <div className="flex flex-col right-3 bottom-14 absolute items-center">
                <div className="bg-[#008000] px-4 py-2 rounded-2xl flex w-[124px] justify-between left">
                  <Image
                    src="/images/Attachments/Icon.svg"
                    alt=""
                    height={20}
                    width={20}
                  />
                  <Image
                    src="/images/Attachments/camera.svg"
                    alt=""
                    height={20}
                    width={20}
                  />
                  <Image
                    src="/images/Attachments/Icon-1.svg"
                    alt=""
                    height={20}
                    width={20}
                  />
                </div>
                <div className="">
                  <svg
                    width="16"
                    height="8"
                    viewBox="0 0 16 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.20711 0.5H14.7929L8 7.29289L1.20711 0.5Z"
                      fill="#008000"
                      stroke="#008000"
                    />
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
