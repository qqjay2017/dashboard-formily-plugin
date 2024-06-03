```tsx
<Selecto
                  ref={selectoRef}
                  dragContainer={"#DashboardRoot"}
                  selectableTargets={[".positionDecoratorHandle"]}
                  hitRate={0}
                  selectByClick={true}
                  selectFromInside={false}
                  toggleContinueSelect={["shift"]}
                  ratio={0}
                  onDragStart={(e) => {
                    const moveable = moveableRef.current!;
                    const target = e.inputEvent.target;
                    if (
                      moveable.isMoveableElement(target) ||
                      targets.some(
                        (t: any) => t === target || t.contains(target)
                      )
                    ) {
                      e.stop();
                    }
                  }}
                  onSelectEnd={(e) => {
                    const moveable = moveableRef.current!;
                    let selected = e.selected;

                    // excludes child elements.
                    selected = selected.filter((target) => {
                      return selected.every((target2) => {
                        return target === target2 || !target2.contains(target);
                      });
                    });

                    const result = diff(e.startSelected, selected);

                    e.currentTarget.setSelectedTargets(selected);

                    if (!result.added.length && !result.removed.length) {
                      return;
                    }
                    if (e.isDragStartEnd) {
                      e.inputEvent.preventDefault();

                      moveable.waitToChangeTarget().then(() => {
                        moveable.dragStart(e.inputEvent);
                      });
                    }
                    setTargets(selected);
                  }}
                /> 
                ```