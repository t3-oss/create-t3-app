/** @jsxImportSource react */
import Typist from "react-typist";

export default function CodeCard() {
  return (
    <div className="md:w-[550px] w-full sm:w-[600px] mx-auto overflow-hidden my-5 rounded-lg">
      <div
        className="coding inverse-toggle px-1 sm:px-2 md:px-5 shadow-lg text-green-400 text-[10px] sm:text-xs font-mono subpixel-antialiased 
              bg-neutral pb-6 pt-4 rounded-lg leading-normal overflow-hidden h-[270px] sm:h-[290px] md:h-[350px] lg:h-[310px]"
      >
        <div className="top mb-2 flex">
          <div className="h-3 w-3 bg-red-500 rounded-full"></div>
          <div className="ml-2 h-3 w-3 bg-orange-300 rounded-full"></div>
          <div className="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
        </div>
        <Typist cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}>
          npx create-t3-app@latest
          <Typist.Delay ms={1250} />
        </Typist>
        <Typist
          className="font-mono leading-1 text-transparent bg-clip-text bg-gradient-to-r text-[9px] sm:text-xs from-blue-400 via-green-300 to-pink-600"
          cursor={{ show: false }}
          avgTypingDelay={-500}
        >
          <Typist.Delay ms={2000} />
          &nbsp;&nbsp;&nbsp;&nbsp;___&nbsp;___&nbsp;___&nbsp;&nbsp;&nbsp;__&nbsp;_____&nbsp;___&nbsp;&nbsp;&nbsp;_____&nbsp;____&nbsp;&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;&nbsp;___&nbsp;___&nbsp;
          <br />
          &nbsp;&nbsp;&nbsp;/&nbsp;__|&nbsp;_&nbsp;\&nbsp;__|&nbsp;/&nbsp;&nbsp;\_&nbsp;&nbsp;&nbsp;_|&nbsp;__|&nbsp;|_&nbsp;&nbsp;&nbsp;_|__&nbsp;/&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;\&nbsp;|&nbsp;_&nbsp;\&nbsp;_&nbsp;\&nbsp;&nbsp;
          <br />
          &nbsp;&nbsp;|&nbsp;(__|&nbsp;&nbsp;&nbsp;/&nbsp;_|&nbsp;/&nbsp;/\&nbsp;\|&nbsp;|&nbsp;|&nbsp;_|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;|_&nbsp;\&nbsp;&nbsp;/&nbsp;/\&nbsp;\|&nbsp;&nbsp;_/&nbsp;&nbsp;_/&nbsp;
          <br />
          &nbsp;&nbsp;&nbsp;\___|_|_\___|_/‾‾\_\_|&nbsp;|___|&nbsp;&nbsp;&nbsp;|_|&nbsp;|___/&nbsp;/_/‾‾\_\_|&nbsp;|_|&nbsp;&nbsp;
          <br />
        </Typist>
        <Typist
          startDelay={2100}
          className=""
          cursor={{ show: false }}
          avgTypingDelay={-500}
        >
          <div className="whitespace-nowrap flex">
            ? What will your project be called? (my-t3-app)
            <Typist.Delay ms={500} />
            <Typist
              cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}
              avgTypingDelay={50}
              className="pl-1 text-blue-400"
            >
              my-t3-app
            </Typist>
          </div>
          <br />
        </Typist>
        <Typist
          cursor={{ show: false }}
          startDelay={4800}
          avgTypingDelay={-10000}
        >
          ? Will you be using JavaScript or TypeScript? (Use arrow keys)
          <br />
          ❯ TypeScript
          <br />
          &nbsp;&nbsp;JavaScript
          <Typist.Backspace count={87} delay={1000} />
          <Typist
            cursor={{ show: false }}
            avgTypingDelay={-10000}
            className="translate-y-[-2rem]"
          >
            <span>
              <span>? Will you be using JavaScript or TypeScript?</span>
              <span className="pl-2 text-blue-400">TypeScript</span>
            </span>
          </Typist>
        </Typist>
        <Typist
          cursor={{ show: false }}
          startDelay={6300}
          avgTypingDelay={-10000}
          className="translate-y-[-2.2rem]"
        >
          Good choice! Using TypeScript!
          <br />
          <Typist.Delay ms={1000} />
          {`? Which packages would you like to enable? (Press <space> to select, <a> to toggle all, <i> to invert selection, and
<enter> to proceed)`}
          <br />
          <span>
            <span className="text-blue-400">❯</span>
            <span>
              ◯<span className="text-blue-400 pl-1">nextAuth</span>
            </span>
          </span>
          <br />
          &nbsp;◯ prisma
          <br />
          &nbsp;◯ tailwind
          <br />
          &nbsp;◯ trpc
          <Typist.Delay ms={900} />
          <Typist.Backspace count={38} />
          <Typist.Delay ms={1200} />
          <Typist.Backspace count={135} />
          <span></span>
        </Typist>
        <Typist
          cursor={{ show: false }}
          startDelay={10000}
          avgTypingDelay={-10000}
          className="translate-y-[-6.2rem] sm:translate-y-[-6.4rem] md:translate-y-[-6.2rem] lg:translate-y-[-6.2rem]"
        >
          <span>? Which packages would you like to enable?</span>
          <span className="pl-1 text-blue-400">
            nextAuth, prisma, tailwind, trpc
          </span>
        </Typist>
        <Typist
          cursor={{ show: false }}
          avgTypingDelay={-20000}
          className="translate-y-[-5rem] sm:translate-y-[-5.2rem] md:translate-y-[-5.5rem] lg:translate-y-[-5.2rem]"
          startDelay={8700}
        >
          <span>
            <span className="text-blue-400">❯</span>
            <span>
              ◉<span className="text-blue-400 pl-1">nextAuth</span>
            </span>
          </span>
          <br />
          &nbsp;◉ prisma
          <br />
          &nbsp;◉ tailwind
          <br />
          &nbsp;◉ trpc
          <br />
          <Typist.Delay ms={1000} />
          <Typist.Backspace count={50} />
        </Typist>
        <Typist
          cursor={{ show: false }}
          startDelay={10500}
          avgTypingDelay={-10000}
          className="translate-y-[-10rem] sm:translate-y-[-10.5rem] md:translate-y-[-10rem] lg:translate-y-[-10rem]"
        >
          <div className="whitespace-nowrap flex">
            <span>? Initialize a new git repository? (Y/n)</span>
            <Typist.Delay ms={1000} />
            <Typist
              cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}
              className="pl-2 text-blue-400"
            >
              n
            </Typist>
            <Typist.Delay ms={1500} />
            <Typist.Backspace count={1} />
            <span className="text-blue-400">No</span>
          </div>
        </Typist>
        <Typist
          cursor={{ show: false }}
          startDelay={13000}
          avgTypingDelay={-10000}
          className="translate-y-[-10rem] sm:translate-y-[-10.5rem] md:translate-y-[-10rem] lg:translate-y-[-10rem]"
        >
          Sounds good! You can come back and run git init later.
        </Typist>
        <Typist
          cursor={{ show: false }}
          startDelay={14500}
          avgTypingDelay={-10000}
          className="translate-y-[-10rem] sm:translate-y-[-10.5rem] md:translate-y-[-10rem] lg:translate-y-[-10rem]"
        >
          <div className="whitespace-nowrap flex">
            <span>? Would you like us to run npm install? (Y/n)</span>
            <Typist.Delay ms={1000} />
            <Typist
              cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}
              className="pl-2 text-blue-400"
              avgTypingDelay={-10000}
            >
              y
              <Typist.Backspace count={1} delay={1000} />
              <span className="text-blue-400">Yes</span>
            </Typist>
          </div>
        </Typist>
        <Typist
          cursor={{ show: false }}
          startDelay={16000}
          avgTypingDelay={-10000}
          className="translate-y-[-10rem] sm:translate-y-[-10.5rem] md:translate-y-[-10rem] lg:translate-y-[-10rem]"
        >
          Alright. We&apos;ll install the dependencies for you!
        </Typist>
      </div>
    </div>
  );
}
