import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";




gsap.registerPlugin(ScrollTrigger);
function About() {
    const ref = useRef();
    const ref2 = useRef();
    const ref3 = useRef();
    const ref4 = useRef();
    
    useEffect(() => {

        gsap.from([ref.current, ref2.current], {
            y: -100,
            duration: 2
        })

        gsap.from(ref3.current, {
            x: -100,
            duration: 2,
            delay: 2
        })
        if (window.innerWidth > 700) {

            gsap.to(ref4.current, {
                x: 1600,


                scrollTrigger: {
                    trigger: ref4.current,
                    scrub: 1,
                    start: "top 50%",
                    end: "bottom 15%",


                }
            })

        }
        else {
            gsap.to(ref4.current, {
                x: 1200,


                scrollTrigger: {
                    trigger: ref4.current,
                    scrub: 1,
                    start: "top 40%",
                    end: "bottom 1%",


                }})}

            }, []);
            return (


                <div className="bg-gray-800 h-auto  w-auto ">
                    <div ref={ref3} >

                        <Link to="/Home" className=" text-white ml-5 " >
                            HOME
                        </Link>
                    </div>

                    <h1 ref={ref} className="text-pink-600 text-center font-sans font-bold text-2xl   "
                    >We are always here for you</h1>
                    <hr className="m-5 bg-green-400" />
                    <div ref={ref2} className=" h-auto w-full">

                        <img className="mx-auto" src="https://blogassets.airtel.in/wp-content/uploads/2023/05/felix-rostig-UmV2wr-Vbq8-unsplash.jpg" alt="" />
                    </div>
                    <hr className="m-5 bg-green-400" />
                    <p className="text-white m-7">Lorem ipsum dolor sit amet consectetur, adipisicing elit. A nihil laborum iusto unde tempore nam dolores dicta esse molestias adipisci pariatur explicabo dolore vel, est dolorem numquam minima ducimus, magni neque. Tenetur esse, eum necessitatibus odit laboriosam repellendus assumenda quia quos libero dolores magni consectetur natus aperiam velit, accusamus quod et non harum veniam omnis at adipisci! Doloribus id quisquam voluptate enim a nulla ex quia, sequi ullam explicabo inventore ea vitae quam ipsa repudiandae tempora dolorum? At magnam quos ratione corporis libero necessitatibus laudantium eveniet assumenda laborum accusantium modi sit architecto neque hic nesciunt, cupiditate doloribus maiores, harum dolores?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi corporis architecto aspernatur vel facere quae dolorum voluptatum deserunt, totam officiis, consequatur modi eum praesentium sed! Omnis iure possimus qui alias quia repellat vel officiis repudiandae, quibusdam voluptate vitae laboriosam adipisci maxime. Sunt ex vitae, saepe dolor illum reiciendis soluta esse minus porro illo. Mollitia, debitis veritatis et dolorem eveniet nesciunt maiores ex ad? Illo ut non expedita ea explicabo! Numquam quos aperiam, incidunt temporibus deleniti maiores nisi saepe modi reiciendis nihil neque, tempora pariatur officiis labore asperiores velit, dolor adipisci vel? Perferendis iure nisi inventore veniam sunt incidunt accusantium sapiente repellat totam nam tempore doloremque harum voluptas reiciendis dolor ipsam deserunt obcaecati, et eaque vel? Accusantium sunt est in adipisci architecto eveniet esse facere vitae. Ea nemo, assumenda ab, vero earum repudiandae eum, placeat quas dolorem quia dolorum explicabo ullam fugit doloremque veritatis id rerum alias corrupti unde laboriosam amet nulla? Soluta rerum velit ipsa amet harum ad odit impedit explicabo! Odit, quos quam. Neque, modi! Assumenda, magni eveniet ut nisi illo consequatur. Magnam dolores, itaque molestiae ea odio alias veritatis minus illo iste natus dolorum sapiente vel quas aliquam, debitis ratione. Quasi praesentium, quidem facilis non totam veniam fuga?</p>

                     <h1 className="text-pink-600 text-center font-sans font-bold text-2xl"  >OUR SERVICES</h1>
                  
                       <hr />
                    <div ref={ref4} className="bg white w-full h-auto overflow-y-hidden" >
                        <img className="md:w-52 h-auto w-28 " src="src\assets\360_F_617568706_tOByNcaCruSyqOHTcjTPlPFNXXL6tCKm-removebg-preview.png" alt="car image" />
                    </div>
                        <hr />

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe esse commodi eius similique fuga eveniet autem dicta veniam unde quos. Sint, unde laudantium, sunt corrupti necessitatibus quam voluptatum explicabo enim fugiat, ipsa esse nesciunt in suscipit error veritatis doloribus nisi aut dignissimos harum praesentium ad obcaecati odio repudiandae. Optio neque quas unde tenetur veniam doloremque facere non a, quaerat adipisci id, delectus deserunt architecto necessitatibus, amet fugiat impedit. Obcaecati assumenda fuga laboriosam natus ullam, minima non aspernatur placeat voluptate? Voluptate repudiandae quo eaque aperiam molestias voluptatibus cumque tempora doloribus hic, itaque, laboriosam est possimus magnam quas quia corporis? Dolor harum magni exercitationem eveniet debitis beatae nisi labore aliquid corporis nam incidunt accusamus quae amet consequuntur culpa inventore a laboriosam cupiditate minus voluptas fuga illum deserunt, dolores sequi? Placeat debitis assumenda mollitia, voluptates doloremque repellat est at ipsa blanditiis eaque error asperiores neque, quam tenetur vero. Nihil, temporibus deserunt placeat quis facilis voluptate beatae harum molestias blanditiis corrupti exercitationem neque repellat, quia quas dolor perferendis nobis? Vitae natus dolorem doloremque, modi eaque est debitis aliquid recusandae accusamus omnis? Soluta ad minima eum laborum a aliquam harum illum magnam provident delectus laudantium, non ipsa accusantium officiis nobis itaque. Eaque possimus ad consequatur libero voluptas. Dolorum perferendis minima repellat maxime, explicabo suscipit pariatur, ipsam blanditiis dolorem consequatur dolores aliquam praesentium facere! Nobis velit consectetur cumque ut commodi voluptatibus iste assumenda nihil impedit sint veritatis quasi perferendis adipisci sed quos itaque cupiditate reiciendis ea, tempora eaque? Delectus rerum earum voluptates sequi recusandae quod assumenda. Sint dignissimos repellat saepe amet at omnis iusto alias quisquam numquam labore harum magni recusandae autem est, adipisci fugiat natus velit libero, unde, laudantium voluptatum. Impedit voluptates tempora illo odit et facilis iure voluptatum repudiandae incidunt omnis numquam corporis cumque optio, nihil quidem aliquam veritatis a placeat totam tempore esse illum dolor voluptatem molestias. Fuga accusamus architecto deserunt reiciendis amet odio, deleniti, ullam mollitia doloribus incidunt iusto cupiditate quaerat. Enim illo non quasi ab dolore laborum, harum sint aliquid praesentium ipsam ipsum nemo veritatis laudantium perferendis. Error eligendi aut blanditiis. Ut dicta provident et odit? Nihil eos recusandae cupiditate vel odit! Suscipit quod nemo odio, sunt quia qui perspiciatis architecto ipsa velit commodi? Expedita eaque, tempora, aperiam laboriosam dolorem ipsam molestiae, eveniet perferendis omnis delectus alias neque quos ullam. Modi ipsum, facilis totam at magni deleniti veniam reprehenderit eveniet quis maxime facere placeat veritatis consectetur officia nulla aspernatur, sed dolorem ullam pariatur id ex eius quas perferendis praesentium. Fuga iusto rerum eveniet natus, molestias ex, eaque quaerat minus mollitia porro quos, a nesciunt debitis laboriosam cum at voluptas harum unde. Minima error earum mollitia hic necessitatibus eligendi cumque quia odit reprehenderit saepe debitis eum fuga sed quibusdam, iusto facilis qui a et voluptatem optio ratione tempora repudiandae! Magni porro nam voluptatem at libero ex ut consectetur voluptatibus facere necessitatibus neque quae, vel cum maxime distinctio assumenda mollitia tempore quia, iusto suscipit fugiat cupiditate possimus. Sunt odit reiciendis aliquid necessitatibus, libero accusamus nulla natus sit dolorum eligendi id corporis fugiat eveniet! Sapiente repudiandae tempore quia maxime commodi. Repudiandae officia ab reiciendis ipsam sunt assumenda enim, fuga totam culpa, blanditiis officiis, similique aliquid est! Sapiente eum quos reiciendis mollitia recusandae, impedit aliquid dolor quo cupiditate maxime rerum laborum consequuntur ullam maiores a asperiores ipsam aliquam placeat illum corrupti iusto. Natus quos assumenda, illo sapiente consectetur ducimus accusamus voluptatibus. Necessitatibus quisquam facere veritatis veniam! Aut voluptate repellat eius quae deserunt molestiae animi labore sequi ab, doloribus, voluptatum voluptatibus excepturi rem perspiciatis quidem non repudiandae pariatur fugit numquam. Sed, at officiis cum qui nesciunt non earum alias hic ipsum rem ex exercitationem minus suscipit animi temporibus distinctio labore, eos dolorum iusto nisi. Iusto nobis ad officia dolor accusamus sed quidem facere a, possimus repellat in. Soluta quidem animi quas error ipsum quisquam natus harum commodi temporibus, eligendi molestiae eum a, necessitatibus velit sunt tenetur distinctio. Beatae hic maxime doloremque quasi est fuga facere recusandae cum odit rem! At nihil voluptatibus totam tempore ipsam laboriosam sunt minima, minus rerum vero vel officiis eveniet ratione ducimus molestias doloribus, explicabo veniam libero. Similique, odio! Nisi inventore totam culpa veniam aliquid adipisci libero vel modi quae? Voluptatum quae corrupti reprehenderit quasi optio exercitationem deserunt aliquam iste excepturi magni ut laudantium itaque doloremque pariatur expedita ea vitae dolore, incidunt sunt nisi numquam nam. Illo corporis unde iusto, ipsum quisquam cupiditate fugit fugiat culpa quas natus pariatur, provident incidunt ipsam possimus a quod quo, ex explicabo amet. Quidem reprehenderit ad cupiditate architecto culpa delectus rerum natus beatae maxime ipsam ut totam facilis saepe, distinctio corporis nostrum est repellendus veniam ipsum? Repellendus saepe assumenda reprehenderit sapiente ea vitae, distinctio, similique nemo vel iste labore quasi fuga, placeat ab! Voluptatibus, amet neque? Quo dolorem expedita totam, voluptatem delectus ullam ab aspernatur praesentium corrupti autem, amet minus labore accusamus voluptate quibusdam, possimus dolor dolorum assumenda culpa? Aspernatur possimus expedita odit reprehenderit! Est laborum distinctio natus ipsam facere tempora quas, ea molestiae reprehenderit ut sit incidunt quis animi deleniti sunt esse expedita delectus nostrum itaque illum? Vitae molestiae quod officiis nesciunt vel? Porro doloribus obcaecati vel nisi sunt? Eum delectus error animi laborum quod sunt accusamus nobis facere ex, tempore aperiam pariatur sapiente amet facilis quibusdam, excepturi ad provident sit est? Ipsum, ratione sed corporis provident sit harum voluptate culpa adipisci unde corrupti, minima voluptatibus eos quasi asperiores! Necessitatibus accusamus ullam voluptatibus dolor non. Labore ratione rem voluptates? Possimus, animi velit ipsam inventore repellendus consequatur aperiam. Fuga ipsa totam possimus non magnam animi distinctio inventore labore beatae velit laborum accusamus vero est molestiae explicabo architecto excepturi quos, adipisci incidunt? Magnam in illum, nemo fugit eligendi optio molestiae minus nam perspiciatis? Inventore enim tempore beatae pariatur id, vel cupiditate tempora at fuga quisquam. Iste omnis magni eligendi porro officiis ipsum repellat quo harum. Aspernatur, ipsum delectus! Atque fuga eaque qui ut dicta deserunt, doloremque minima a? Velit possimus facilis, doloribus corrupti incidunt dicta dignissimos quisquam, reiciendis suscipit dolor quaerat a voluptas perspiciatis rem quidem, debitis provident deserunt assumenda! Consectetur iusto asperiores voluptate, eos tenetur optio.</p>
                </div>
            )

        }
        export default About;