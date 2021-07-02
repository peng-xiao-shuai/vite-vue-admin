<script lang='tsx'>
import { defineComponent, ref, Transition } from "vue";
import { useStore } from "vuex";
import defaultData from "@/config/default-data";
import { SETLOCALE } from "@/language";

export default defineComponent({
  setup(props) {
    const store = useStore();
    let locale = defaultData.locale;
    // 可选语言
    const localeSelect = defaultData.localeSelect;

    const setLocale = (e: any, val: string) => {
      if (val) {
        SETLOCALE(val);
      }
    };
    const slots = {
      dropdown: (e: any) => {
        return (
          <el-dropdown-menu class="user-dropdown">
            {localeSelect.map((item: any, index: number) => {
              return (
                <el-dropdown-item
                  key={"locale" + index}
                  onClick={(e: Event) => {
                    setLocale(e, item.value);
                  }}
                >
                  <div
                    style={{
                      color:
                        locale == item.value
                          ? store.getters.getThemeColor
                          : "#666",
                    }}
                  >
                    <i
                      class="language_r"
                      style={
                        locale == item.value
                          ? {
                              borderColor: store.getters.getThemeColor,
                              background: store.getters.getThemeColor,
                            }
                          : {}
                      }
                    ></i>
                    {item.label}
                  </div>
                </el-dropdown-item>
              );
            })}
          </el-dropdown-menu>
        );
      },
    };

    return () => (
      <div class="item">
        <el-dropdown class="avatar-container" trigger="hover" v-slots={slots}>
          <div
            class={[
              "viteIcon",
              locale == "en-US" ? "vitelanguage2" : "vitelanguage2",
            ]}
          ></div>
        </el-dropdown>
      </div>
    );
  },
});
</script>

<style lang='scss'>
.language_r {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid #999;
  margin-right: 10px !important;
  display: inline-block;
}
</style>