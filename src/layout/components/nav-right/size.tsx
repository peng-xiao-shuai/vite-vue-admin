import { defineComponent, ref, inject, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import Cookies from "js-cookie";
import defaultData from "@/config/default-data";
import { ElMessage } from 'element-plus';

export default defineComponent({
  setup() {
    const store = useStore();
    const { proxy } = getCurrentInstance() as any
    let size = ref(Cookies.get("size") || "small");

    type SizeSelect = {value: string, label: string}
    let sizeSelect: SizeSelect[] = [
      {
        value: "default",
        label: "default",
      },
      {
        value: "medium",
        label: "medium",
      },
      {
        value: "small",
        label: "small",
      },
      {
        value: "mini",
        label: "mini",
      },
    ];

    // 修改组件大小
    const setSize = (e: string) => {
      Cookies.set("size", e);
      size.value = e;
      ElMessage.success("修改成功！即将刷新网页");
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
    const slots = {
      dropdown: () => {
        return (
          <el-dropdown-menu class="user-dropdown">
            {sizeSelect.map((item: SizeSelect, index: number) => {
              return (

                <el-dropdown-item
                  key={"locale" + index}
                  onClick={() => {
                    setSize(item.value);
                  }}
                >
                  <div style={{ color: size == item.value ? store.getters.getThemeColor : '#666' }}>
                    <i
                      class="language_r"
                      style={
                        size.value == item.value
                          ? {
                            borderColor: store.getters.getThemeColor,
                            background: store.getters.getThemeColor,
                          }
                          : {}
                      }
                    ></i>
                    { proxy.t(item.label) }
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
          <div class={[defaultData.iconfont,"vitefont-size"]}></div>

        </el-dropdown>
      </div>
    );
  },
});