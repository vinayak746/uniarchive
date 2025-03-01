import { JSX } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

function Layout(): JSX.Element {
  return (
    <div className={`w-full h-screen flex flex-col`}>
      <Navbar />
      <div className="flex flex-col sm:flex-row grow min-h-0 px-4 pb-4 gap-4 sm:px-8 sm:gap-8">
        <Sidebar />
        <main className="grow overflow-auto min-h-0 bg-secondary p-6 rounded-[2rem]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias ad
          suscipit praesentium unde, doloremque modi, quos debitis quaerat harum
          eveniet accusantium corrupti inventore, eligendi est. Minima dolor
          necessitatibus vitae totam libero rem sapiente mollitia officia
          pariatur voluptate facilis unde ratione, repellendus repudiandae? Est
          pariatur at, veniam blanditiis velit iste ab neque ducimus nobis
          maxime nostrum error libero. Unde rerum tempora laborum animi,
          exercitationem placeat, beatae, explicabo voluptatum provident hic
          ratione inventore. Esse saepe vel ex blanditiis eaque vitae
          accusantium, asperiores earum eveniet commodi odit provident autem
          voluptas voluptatem, nisi dolores. Quis commodi dicta ab a, rem
          assumenda iure voluptatem maiores et quae eum tempora fugit sapiente
          aspernatur ea, neque enim, repellat repellendus vel placeat quibusdam
          quod cumque corrupti. Enim accusamus architecto quasi aut id assumenda
          vero inventore, ducimus cum tempora sint veniam. Qui rerum culpa
          maxime, perferendis, officia voluptas consectetur quidem facilis
          placeat vero iure eaque cumque provident consequuntur totam laudantium
          corporis neque repudiandae quas cum veniam vel. Quibusdam deleniti
          corrupti in, omnis fugiat velit doloribus earum consequatur dicta ex
          officiis obcaecati sint culpa necessitatibus exercitationem eaque,
          minima at, dolorem quisquam nostrum adipisci. Error, accusamus! Nemo,
          ipsum? Ea beatae eum saepe laboriosam, aliquid esse et hic magnam,
          vitae, asperiores placeat omnis deserunt. Consectetur, magnam
          cupiditate dolores culpa, nobis porro vitae, a enim aliquam
          exercitationem accusamus quasi atque architecto explicabo sit
          provident error molestiae sequi deserunt dolor? Quas magnam, tenetur
          accusantium eveniet repudiandae dolor dignissimos tempora ut,
          distinctio consequatur totam recusandae minus eligendi quia reiciendis
          temporibus! Error, expedita deserunt facilis voluptatum officia vero
          iure, veritatis dolores deleniti officiis ex quidem sed eius laborum
          laboriosam. Accusantium, laboriosam assumenda voluptatem sunt
          necessitatibus alias dicta ex tempore voluptatibus molestiae autem in
          quidem ipsum fugiat minus explicabo amet numquam perferendis nemo
          sequi expedita architecto sint, adipisci suscipit. Reprehenderit fuga
          vel, laborum beatae officia, possimus praesentium consequatur
          consequuntur unde dolorum in eum debitis nostrum iure voluptatibus
          dignissimos doloribus amet totam expedita ratione molestias, sapiente
          dolore eaque blanditiis. Esse cupiditate sint nisi natus amet quam
          quod ullam, reprehenderit ipsum provident alias repellendus
          praesentium? Consectetur placeat voluptatibus totam dolorem voluptate
          quod aut eaque distinctio repellendus accusantium ipsam nisi, saepe
          suscipit illum rem vel rerum quia. Porro, nobis totam. Voluptatibus
          velit ea provident rerum aspernatur totam recusandae reiciendis atque
          maiores voluptas eveniet quaerat nobis blanditiis placeat quasi ut est
          cumque, pariatur, officia excepturi necessitatibus vitae quis. Iste
          ipsa aliquid mollitia tenetur ipsam quod quia voluptates, asperiores
          consectetur! Eveniet et ad architecto libero, mollitia accusamus unde
          nulla voluptates nisi blanditiis voluptate, iure at amet placeat
          quisquam doloremque ex. Quod quis, similique ipsum totam repudiandae
          obcaecati ipsa officia culpa voluptatibus ullam maiores non vitae
          libero deserunt deleniti doloremque maxime in architecto aut earum
          debitis sunt saepe corporis reiciendis. Dolores rem harum architecto.
          Dicta quis voluptas, aperiam autem recusandae cupiditate dolorem, sint
          nobis odit animi ab at consequuntur asperiores incidunt eveniet harum
          non. Soluta aliquam a similique libero voluptates rerum obcaecati,
          quibusdam doloribus provident aut perspiciatis. Ut ipsa sequi
          architecto vero, ipsum suscipit laudantium nulla voluptates in dicta
          quos soluta labore debitis voluptatum? Quia atque dignissimos totam,
          obcaecati ratione ipsam pariatur. Iusto quisquam perspiciatis, neque
          maxime iste iure repellendus earum quasi, veritatis provident corrupti
          mollitia sed eius dolor sint ea. Eos architecto tempore aliquam
          consequatur odio cum molestias, neque modi quia a ea, itaque saepe.
          Facilis esse ullam tenetur. Soluta accusamus maxime quis officia,
          quidem repellat. Corporis voluptas soluta aut alias praesentium magnam
          eligendi dolores amet aliquid exercitationem pariatur voluptate saepe
          iusto, animi natus fugiat iure ea nihil commodi repellat, officiis,
          quos ipsam molestias dicta. Impedit sit ipsa praesentium culpa
          consectetur veniam ad tempora eligendi magni accusamus, commodi
          perspiciatis rerum qui fuga. Maiores debitis laboriosam, tempora dicta
          aliquam porro autem deleniti quis nam, cumque ad placeat quidem. Neque
          soluta corrupti officia libero dolor officiis molestias amet? Et esse,
          delectus soluta atque dolor maxime. Amet libero doloremque atque
          corporis, ullam laboriosam, explicabo provident, alias facere tenetur
          placeat ipsam eaque dicta omnis at aperiam voluptatem. Hic laboriosam
          quam deleniti in nulla necessitatibus omnis, voluptates atque dolorum
          nobis. At dolores tempore tempora nihil libero non voluptates animi
          illum quibusdam nostrum praesentium excepturi optio magnam fugit
          possimus enim sit ut neque, similique autem assumenda distinctio
          accusamus delectus maxime? Eius provident explicabo, magnam totam
          dolores voluptates saepe.
        </main>
      </div>
    </div>
  );
}

export default Layout;
