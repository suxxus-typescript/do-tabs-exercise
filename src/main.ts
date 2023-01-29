import "./style.css";

const App = document.querySelector("#app");

type TabsItem = {
  name: string;
  id: string;
};

type Tab = {
  title: string;
  items: TabsItem[];
  tabs?: Tabs;
};

type Tabs = Tab[];

function tree2(tabs: Tabs, acc: string[]): string[] {
  tabs.forEach((tab) => {
    acc.push(tab.title);
    if (tab.tabs) {
      tree2(tab.tabs, acc);
    }
  });

  return acc;
}

function TabMenu({ title, items }: Tab): Node {
  const Div = document.createElement("div");
  const Button = document.createElement("button");
  const Dl = document.createElement("dl");

  Dl.classList.add("menu_items");

  Button.textContent = title;
  Button.classList.add("menu_title");

  Div.appendChild(Button);

  items.forEach(({ name, id }: TabsItem) => {
    const Item = document.createElement("dd");
    const A = document.createElement("a");
    A.setAttribute("href", "#");
    A.textContent = name;
    A.setAttribute("id", id);
    A.setAttribute("data-tabname", name);

    Item.appendChild(A);
    Dl.appendChild(Item);
  });
  //
  Div.appendChild(Dl);
  //
  return Div;
}

function TabsMenu(tabs: Tabs, nodes: Node[]): Node {
  const TabContainer = document.createElement("ul");
  TabContainer.classList.add("menu");
  //
  tabs.forEach((tab: Tab) => {
    const Li = document.createElement("li");
    Li.appendChild(TabMenu(tab));
    nodes.push(Li);

    if (tab.tabs) {
      TabsMenu(tab.tabs, nodes);
    }
  });

  nodes.forEach((li) => {
    TabContainer.appendChild(li);
  });

  return TabContainer;
}

((app) => {
  const tabs: Tabs = [
    {
      title: "my title",
      items: [
        {
          name: "item 1",
          id: "xsez",
        },
        {
          name: "item 2",
          id: "yttys",
        },
      ],
      tabs: [
        {
          title: "submenu",
          items: [
            {
              name: "sub item 1",
              id: "xdfssrs",
            },
          ],
          tabs: [
            { title: "submenu 2", items: [{ name: "pepe", id: "xtyed" }] },
          ],
        },
      ],
    },
    {
      title: "my title 2",
      items: [
        {
          name: "item 1",
          id: "xsez",
        },
        {
          name: "item 2",
          id: "yttys",
        },
      ],
    },
  ];

  if (app) {
    // console.log(tree2(tabs, []));
    app.appendChild(TabsMenu(tabs, []));
  }
})(App);
