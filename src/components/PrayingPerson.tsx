import {motion} from "framer-motion";

const PrayingPerson = () => {

    const keyframes = {
        hidden: {
            pathLength: 0,
        },
        visible: {
            pathLength: 1,
        }
    }

    return (
        <motion.svg 
            viewBox="0 0 538 493" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="w-[100%] md:w-[538px] stroke-blue stroke-[3px] lg:w-[620px]"
        >
            <motion.path 
                d="M537 387C536.833 391.167 531.6 399.7 512 400.5C487.5 401.5 448.5 379 421.5 380.5C394.5 382 360 396 364.5 406.5C369 417 379.294 402.663 380 396.5C380.706 390.337 373 344.5 364.5 324C357.139 306.248 336.094 255.69 326.038 239.856C325.006 238.231 323.868 238.993 324.618 240.766C341.754 281.26 367.556 354.354 364.5 383C361.354 412.495 350.539 409.608 345.266 404.276C345.087 404.095 344.955 403.888 344.865 403.65C341.524 394.89 336.37 372.494 341.5 350C348 321.5 356.5 302.5 360.5 301.5C364.5 300.5 424 295 427 291.5C430 288 387 296.5 402.5 301.5C418 306.5 451 304.5 451.5 298C452 291.5 452 282 442 273C432 264 424 268.5 427 276.5C430 284.5 437.75 298 444 296.5C448.247 295.481 451.351 290.662 452.854 287.345C453.262 286.443 454.218 285.894 455.201 286.016C461.153 286.752 470.431 285.987 470.25 278C470.188 275.282 469.33 273.257 468.048 271.766C466.578 270.058 465.435 262.992 466.809 261.206C468.98 258.383 469.41 255.128 465.5 252C455.5 244 420.75 230 415 241C409.25 252 445 266.75 449.25 268C453.5 269.25 478.5 255.25 472 244C469.23 239.206 466.905 236.374 465.16 234.787C463.984 233.718 462.976 231.124 463.498 229.622C465.483 223.907 465.898 215.493 457.25 211.25C444 204.75 403.5 208.25 406.75 219.75C410 231.25 434.75 235.25 442 235.25C449.25 235.25 465 238.5 468.5 222.75C471.873 207.57 463.17 195.873 452.688 194.599C451.959 194.51 451.309 194.089 450.955 193.446C446.686 185.683 435.072 174.663 418.25 185.75C396.25 200.25 401.25 204.5 402.5 206.75C403.75 209 434.75 213.75 446 200.75C457.25 187.75 456.25 169.5 438.5 166.75C427.944 165.115 409.827 172.404 396.225 179.231C394.166 180.264 395.131 182.578 397.305 181.815C411.595 176.799 426.659 168.986 421.81 160.974C421.623 160.665 421.328 160.417 420.985 160.305C418.232 159.404 410.894 158.891 399.5 163C387.554 167.308 375.432 182.036 370.551 189.297C370.35 189.596 370.081 189.837 369.747 189.973C366.865 191.146 360.52 192.139 354.5 188C346.5 182.5 373.25 193.25 376.75 188C380.25 182.75 388.5 168.75 394.75 160.5C399.061 154.809 396.743 148.833 394.366 145.585C393.776 144.779 392.654 144.689 391.84 145.269C385.026 150.133 371.947 158.638 364.5 160.5C354.5 163 319 217 313.5 230.5C308 244 273.25 284.25 273.5 293.5C273.75 302.75 288.5 287 300.25 287.5C312 288 334 318.25 335 346.25C336 374.25 331 392.25 322.25 346.25C313.5 300.25 316.25 272.25 310.25 263C304.25 253.75 290.5 247.25 282 258.25C273.647 269.06 266.743 276.731 256.068 286.957C255.705 287.305 255.482 287.779 255.451 288.28L254.302 306.427C254.269 306.954 254.032 307.442 253.641 307.797C243.401 317.12 230.02 335.333 254.016 337.975C254.165 337.991 254.33 337.99 254.479 337.972C268.758 336.191 269.556 330.62 270.75 315.5C272.25 296.5 302.25 335.75 306.25 344.75C310.25 353.75 323 383.5 304.5 400.5C286 417.5 282.5 420 276 413.25C269.5 406.5 300.25 382.75 300.25 373.75C300.25 364.75 282.75 359.75 258.5 359.75C234.25 359.75 211 350.75 210.5 336.25C210 321.75 233 327.5 237.5 340C242 352.5 243.25 401.5 232.75 406.5C222.25 411.5 214.25 346.25 207.75 344.75C201.25 343.25 189 343.5 182.5 375.75C178.708 394.562 171.142 399.542 165.189 399.568C163.269 399.576 163.492 397.244 165.267 396.513C170.137 394.505 175.186 390.328 175.336 382.685C175.359 381.511 174.256 380.687 173.087 380.803C165.768 381.53 153.226 380.027 146.402 369.668C145.647 368.523 144.011 368.275 143.12 369.317C136.585 376.951 126.958 392.705 129.5 408.5C133 430.25 177 456 175.25 469C173.5 482 152.75 492.5 115.5 491.5C78.25 490.5 64.25 492.5 48.25 445.25C32.25 398 -8.25004 339.25 2.99996 280.75C14.25 222.25 38.5 218.5 49.25 218C60 217.5 74.75 237.5 88 253.75C101.25 270 123.5 239.75 131 239.75C138.5 239.75 151 244.75 152.75 239.75C154.5 234.75 159.25 239.75 162.5 239.75C165.75 239.75 190 227.25 193.5 229.75C197 232.25 208.75 248.5 215.75 246.5C222.75 244.5 270 197.75 276 196.25C281.902 194.775 368.594 185.075 392.129 116.71C392.64 115.225 391.279 113.759 389.739 114.073C376.638 116.751 350.694 118.211 328.5 106.75C298 91 279 57.75 268.75 34.75C258.5 11.75 241.75 -16.25 243 15.75C244.248 47.7084 259.71 85.4018 221.649 87.9901C221.554 87.9965 221.457 87.9968 221.361 87.9886C215.948 87.5232 203.276 84.0093 194.75 73.5C184 60.25 193.75 118.75 156.5 135.25C119.25 151.75 116.75 116.25 121.25 96.75C125.75 77.25 142.75 83.25 141.5 108.25C140.325 131.744 124.799 152.368 98.2412 165.765C96.5438 166.621 94.8053 164.795 95.6585 163.096C109.326 135.882 126.757 90.0624 103.5 90.25C72.5 90.5 61 116.5 61.25 121.5C61.5 126.5 89.75 141.5 83.5 148C77.25 154.5 75 161.5 78.5 180.5C82 199.5 82.5 223 42.75 263C10.95 295 26.8333 322.5 38.75 332.25" 
                variants={keyframes}
                initial="hidden"
                animate="visible"
                transition={{ ease: "easeInOut", duration: 7, delay: 0 }}
            />
        </motion.svg>
    )

    
}

export default PrayingPerson