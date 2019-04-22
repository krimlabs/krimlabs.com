(ns main
  (:require [hx.react :as hx]
            [hx.hiccup :as hiccup]
            ["react-dom" :refer (render hydrate)]
            ["react-router-dom" :refer (Switch BrowserRouter Route)]
            [components.nav :refer [Nav]]
            [pages.careers :refer [Careers]]
            [pages.clients :refer [Clients]]
            [pages.landing :refer [Landing]]))

(hx/defnc App []
  [:div {:class "pt4 sans-serif"}
   [BrowserRouter
    [Switch
     [Route {:path "/" :exact true :component Landing}]
     [Route {:path "/careers" :component Careers}]
     [Route {:path "/clients" :exact true :component Clients}]]]])

(defn- main! []
  (let [root (.getElementById js/document "root")]
    (if (.hasChildNodes root)
      (hydrate (hiccup/parse [App]) root)
      (render (hiccup/parse [App]) root))))
