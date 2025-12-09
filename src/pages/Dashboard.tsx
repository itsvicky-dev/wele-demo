import { MoreHorizontal } from "lucide-react";

export function Dashboard() {
  const cards = [
    {
      id: 1,
      title: "Indian farmers burn crops at night to evade satellite tracking",
      desc: "Research reveals farmers in Punjab and Haryana deliberately shifted crop burning to evening hours",
      sources: 50,
      img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400",
    },
    {
      id: 2,
      title: "Trump signals tariffs on Indian rice, Canadian fertilizer",
      sources: 59,
      img: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=400",
    },
    {
      id: 3,
      title: "Indian banks write off Rs 6.15 lakh crore in loans",
      sources: 61,
      img: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=400",
    },
    {
      id: 4,
      title: "Two-month-old AI startup raises $475M at $4.5B valuation",
      sources: 72,
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
    },
    {
      id: 5,
      title: "AI tools reshape holiday shopping as ChatGPT adds checkout",
      desc: "Major retailers integrate AI assistants",
      sources: 45,
      img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400",
    },
    {
      id: 6,
      title: "New climate report warns of accelerating global warming",
      sources: 38,
      img: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400",
    },
    {
      id: 7,
      title: "Tech giants announce breakthrough in quantum computing",
      sources: 82,
      img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
    },
    {
      id: 8,
      title: "Global markets rally on positive economic indicators",
      sources: 54,
      img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
    },
    {
      id: 9,
      title: "Renewable energy adoption reaches record highs",
      sources: 67,
      img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
    },
    {
      id: 10,
      title: "Major breakthrough in cancer treatment announced",
      sources: 91,
      img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400",
    },
    {
      id: 11,
      title: "Space exploration enters new era",
      sources: 43,
      img: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400",
    },
    {
      id: 12,
      title: "Education technology transforms remote learning",
      desc: "Online platforms see massive growth",
      sources: 56,
      img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
    },
    {
      id: 13,
      title: "Cryptocurrency market shows signs of recovery",
      sources: 48,
      img: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400",
    },
    {
      id: 14,
      title: "Electric vehicle sales surge worldwide",
      sources: 65,
      img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400",
    },
    {
      id: 15,
      title: "New study reveals benefits of remote work",
      sources: 52,
      img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400",
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="border-b border-[#0d0d0d0d] bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-lg text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto space-y-6 p-8">
        {/* 12 grid - image right, text left */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="flex">
            <div className="flex-1 p-6">
              <h3 className="font-semibold text-xl mb-2">{cards[0].title}</h3>
              <p className="text-sm text-gray-600 mb-3">{cards[0].desc}</p>
              <span className="text-xs text-gray-500">
                {cards[0].sources} sources
              </span>
            </div>
            <img
              src={cards[0].img}
              alt=""
              className="w-[30rem] h-[16rem] object-cover"
            />
          </div>
        </div>

        {/* 4-4-4 grid set 1 */}
        <div className="grid grid-cols-3 gap-4">
          {cards.slice(1, 4).map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-sm border overflow-hidden"
            >
              <img
                src={card.img}
                alt=""
                className="w-full h-[14rem] object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-2">{card.title}</h3>
                <span className="text-xs text-gray-500">
                  {card.sources} sources
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 12 grid - image right, text left */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="flex">
            <div className="flex-1 p-6">
              <h3 className="font-semibold text-xl mb-2">{cards[4].title}</h3>
              <p className="text-sm text-gray-600 mb-3">{cards[4].desc}</p>
              <span className="text-xs text-gray-500">
                {cards[4].sources} sources
              </span>
            </div>
            <img
              src={cards[4].img}
              alt=""
              className="w-[30rem] h-[16rem] object-cover"
            />
          </div>
        </div>

        {/* 4-4-4 grid set 2 */}
        <div className="grid grid-cols-3 gap-4">
          {cards.slice(5, 8).map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-sm border overflow-hidden"
            >
              <img
                src={card.img}
                alt=""
                className="w-full h-[14rem] object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-2">{card.title}</h3>
                <span className="text-xs text-gray-500">
                  {card.sources} sources
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 4-4-4 grid set 3 */}
        <div className="grid grid-cols-3 gap-4">
          {cards.slice(8, 11).map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-sm border overflow-hidden"
            >
              <img
                src={card.img}
                alt=""
                className="w-full h-[14rem] object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-2">{card.title}</h3>
                <span className="text-xs text-gray-500">
                  {card.sources} sources
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 12 grid - image right, text left */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="flex">
            <div className="flex-1 p-6">
              <h3 className="font-semibold text-xl mb-2">{cards[11].title}</h3>
              <p className="text-sm text-gray-600 mb-3">{cards[11].desc}</p>
              <span className="text-xs text-gray-500">
                {cards[11].sources} sources
              </span>
            </div>
            <img
              src={cards[11].img}
              alt=""
              className="w-[30rem] h-[16rem] object-cover"
            />
          </div>
        </div>

        {/* 4-4-4 grid set 4 */}
        <div className="grid grid-cols-3 gap-4">
          {cards.slice(12, 15).map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-sm border overflow-hidden"
            >
              <img
                src={card.img}
                alt=""
                className="w-full h-[14rem] object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-2">{card.title}</h3>
                <span className="text-xs text-gray-500">
                  {card.sources} sources
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
