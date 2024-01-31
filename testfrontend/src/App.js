import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import images1 from "../src/images/1wow-boost-homepage-how-to-use-create-account.webp";
import images2 from "../src/images/2wow-boost-homepage-how-to-use-choose-service.webp";
import images3 from "../src/images/3wow-boost-homepage-how-to-use-payment.webp";
import images4 from "../src/images/4wow-boost-homepage-how-to-use-processing.webp";
import bgImage from "../src/images/bgwow-boost-homepage-section-default-bg.png";

function App() {
  const [selectNumber, setSelectNuber] = useState(1);
  // console.log("selectNumber:", selectNumber);

  const [addContinuousSelection, setAddContinuousSelection] = useState(() => [
    { id: selectNumber },
  ]);
  // console.log("addContinuousSelection:", addContinuousSelection);

  const data = [
    {
      id: 1,
      title: "สร้างบัญชี / เข้าสู่ระบบ",
      description:
        "กดสร้างบัญชีผู้ใช้งาน หรือเข้าสู่ระบบด้วยเบอร์โทรศัพท์และ Password",
      image: images1,
    },
    {
      id: 2,
      title: "เลือกบริการ",
      description:
        "เลือกแพ็กเกจตามที่ต้องการ ใส่รายละเอียดให้ครบถ้วนแล้วคลิกปุ่มต่อไปเพื่อไปหน้าชำระเงิน",
      image: images2,
    },

    {
      id: 3,
      title: "ชำระเงิน",
      description:
        "สแกน QR code จากเว็บไซต์เมื่อชำระเสร็จเรียบร้อย คลิกปุ่มแจ้งโอน",
      image: images3,
    },

    {
      id: 4,
      title: "ระบบดำเนินการ",
      description:
        "ระบบจะเริ่มดำเนินการทันทีผลเห็นลัพธ์ไวยอดเพิ่มแบบ เสถียรและมั่งคง",
      image: images4,
    },
  ];
  // console.log("data:", data);

  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  const continuousSelection = id => {
    if (addContinuousSelection.length > 0) {
      const lastId =
        addContinuousSelection[addContinuousSelection.length - 1].id;

      if (id > lastId) {
        setAddContinuousSelection(prev => {
          const newIds = [];
          for (let i = lastId + 1; i < id; i++) {
            newIds.push({ id: i });
          }
          return [...prev, ...newIds, { id }];
        });
      } else if (id < lastId) {
        setAddContinuousSelection(prev => prev.filter(item => item.id <= id));
      }
    } else {
      setAddContinuousSelection([{ id }]);
    }
  };

  return (
    <main>
      <div
        className="w-full flex justify-center py-10"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="w-3/5">
          {/* BOX-TOP */}
          <div className="w-full flex flex-col items-center gap-2">
            <h1 className="text-xl font-bold text-[#34406B]">
              ขั้นตอนการใช้งาน
            </h1>
            <p className="text-base text-[#646F9B]">
              Wowboost เว็บใช้งานง่ายเพียง 4 ขั้นตอนเท่านั้น
              ใครก็สามารถใช้งานได้ เข้าใช้งานได้ตลอด 24 ชม.
            </p>
          </div>

          {/* BOX-BOTTOM */}
          <div className="w-full flex flex-wrap mt-6">
            {/* ROW-IMAGES */}
            <div className="lg:w-[50%] w-full flex justify-center">
              {data
                .filter(el => el.id === parseInt(selectNumber))
                .map((el, idx) => (
                  <div key={idx}>
                    <img
                      key={el.id}
                      src={el?.image}
                      className="lg:w-[380px] lg:h-[380px]  w-[380px]"
                      data-aos="fade-up"
                      data-aos-duration="500"
                    />
                  </div>
                ))}
            </div>

            {/* ROW-SELECT */}
            <div className="lg:w-[50%] lg:flex w-full flex flex-col lg:gap-10 hidden ">
              {data?.map((el, idx) => (
                <div className=" flex gap-2 items-center mt-2">
                  {/* NUMBER */}

                  <button
                    onClick={() => {
                      setSelectNuber(el?.id);
                      continuousSelection(el?.id);
                    }}
                  >
                    <div
                      className={`relative w-[46px] h-[46px] rounded-full ${
                        addContinuousSelection?.some(
                          item => item?.id === el?.id
                        )
                          ? "bg-[#646F9B]"
                          : "bg-[#E2EFFF]"
                      } flex items-center justify-center z-50`}
                    >
                      <h1
                        className={`text-xl ${
                          addContinuousSelection.some(
                            item => item?.id === el?.id
                          )
                            ? "text-[#E2EFFF]"
                            : "text-[#556089]"
                        }`}
                      >
                        {el?.id}
                      </h1>
                    </div>
                  </button>

                  {/* CONTENT */}
                  <div className="w-[506px] h-[40px] flex items-center">
                    {parseInt(selectNumber) === el?.id ? (
                      <>
                        <div className="flex items-center justify-start ">
                          <div className="w-3 overflow-hidden">
                            <div className="h-4 w-full text-sm bg-[#646F9B] rotate-45 transform origin-bottom-right rounded-sm"></div>
                          </div>

                          <div className="w-full text-sm bg-[#646F9B] rounded-lg text-white p-4 my-6 flex-1">
                            <p className="font-bold">{el?.title}</p>
                            <p> {el?.description}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p key={idx} className="text-[#646F9B] text-sm font-bold">
                        {el?.title}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              <span className="absolute h-[300px] top- border border-l border-[#E2EFFF] dark:border-gray-700 ml-6 mt-2 z-10"></span>
              <span
                style={{
                  height: `${
                    addContinuousSelection.length === 1
                      ? 70
                      : addContinuousSelection[
                          addContinuousSelection.length - 1
                        ].id === 4
                      ? 10 + (addContinuousSelection.length - 1) * 100
                      : 60 + (addContinuousSelection.length - 1) * 100
                  }px`,
                }}
                className="absolute top- border border-l border-[#646F9B]
                dark:border-gray-700 ml-6 mt-2 z-20"
              ></span>
            </div>

            {/* After Hidden  */}
            <div className="lg:hidden w-full flex flex-col justify-center items-center">
              {data?.map(
                (el, idx) =>
                  parseInt(selectNumber) === el?.id && (
                    <div
                      key={idx}
                      className="w-full flex flex-col items-center justify-center"
                    >
                      <div className="w-full flex justify-center items-center gap-2 p-2">
                        <div className="w-[26px] h-[26px] rounded-full bg-[#646F9B] flex justify-center items-center">
                          <p className="font-bold text-[#E2EFFF]">{el?.id}</p>
                        </div>

                        <div>
                          <p className="font-bold text-[#646F9B] text-base">
                            {el?.title}
                          </p>
                        </div>
                      </div>

                      <div className="w-full p-2 flex justify-center items-center h-[70px]">
                        <p className="text-[#646F9B]">{el?.description}</p>
                      </div>
                    </div>
                  )
              )}

              <div className="w-full flex justify-center items-center gap-2 p-2">
                {data?.map((el, idx) => (
                  <button
                    className={`w-[30px] h-[30px] rounded-full
                    ${
                      selectNumber === el?.id
                        ? "bg-[#646F9B] w-[40px] h-[20px]"
                        : "bg-[#E2EFFF]"
                    }
                    `}
                    key={idx}
                    onClick={() => {
                      setSelectNuber(el?.id);
                      continuousSelection(el?.id);
                    }}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
