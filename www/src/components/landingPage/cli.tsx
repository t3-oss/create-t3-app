/** @jsxImportSource react */
import Typist from "react-typist";

export default function CodeCard() {
  return (
    <div className="mx-auto w-full overflow-hidden rounded-lg sm:w-[700px] md:w-[600px]">
      <div
        className="inverse-toggle h-[300px] overflow-hidden rounded-lg border border-t3-purple-200/20 bg-white/10 px-1 pb-6 pt-4 
         font-mono text-[10px] leading-normal text-t3-purple-50 subpixel-antialiased shadow-lg transition-all sm:h-[400px] sm:px-2 sm:text-xs md:h-[450px] md:px-5 lg:h-[400px]"
      >
        <div className="top mb-2 flex">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="ml-2 h-3 w-3 rounded-full bg-orange-300"></div>
          <div className="ml-2 h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <Typist cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}>
          npx create-t3-app@latest
          <Typist.Delay ms={1250} />
        </Typist>
        <Typist
          className="leading-1 bg-gradient-to-r from-blue-400 via-green-300 to-pink-600 bg-clip-text font-mono text-[7px] text-transparent sm:text-xs md:text-sm"
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
          &nbsp;&nbsp;&nbsp;\___|_|_\___|_/¯¯\_\_|&nbsp;|___|&nbsp;&nbsp;&nbsp;|_|&nbsp;|___/&nbsp;/_/¯¯\_\_|&nbsp;|_|&nbsp;&nbsp;
          <br />
        </Typist>
        <Typist
          startDelay={2100}
          className=""
          cursor={{ show: false }}
          avgTypingDelay={-500}
        >
          <div className="flex whitespace-nowrap">
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
              ◯<span className="pl-1 text-blue-400">nextAuth</span>
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
              ◉<span className="pl-1 text-blue-400">nextAuth</span>
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
          <div className="flex whitespace-nowrap">
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
          <div className="flex whitespace-nowrap">
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
