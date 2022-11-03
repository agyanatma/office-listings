import React, {
    CSSProperties,
    Fragment,
    useEffect,
    useRef,
    useState,
} from "react";
import "./OfficeList.css";
import { ReactComponent as ChevronDown } from "../../assets/icons/chevron-down.svg";
import { ReactComponent as Pencil } from "../../assets/icons/pencil.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import { COLOR, MIN_WIDTH } from "../../constants/common";
import LocationForm from "../LocationForm/LocationForm";
import "./OfficeList.css";

interface IOfficeListProps {
    id: string;
    title: string;
    caption: string;
    detail: {
        fullname: string;
        job: string;
        email: string;
        phone: string;
    };
}

const OfficeList = ({ id, title, caption, detail }: IOfficeListProps) => {
    const cardRef = useRef<HTMLButtonElement>(null);
    const cardDetailRef = useRef<HTMLDivElement>(null);

    const detailContainerHeight =
        (cardDetailRef.current?.offsetHeight ?? 0) +
        (cardRef.current?.offsetHeight ?? 0) -
        24;
    const initialWrapperStyle = { marginBottom: 0 };
    const initialContainerStyle = {
        borderRadius: "8px 8px 8px 8px",
        backgroundColor: COLOR.white,
    };
    const initialDetailStyle = {
        transform: "translateY(-50%)",
        marginBottom: -detailContainerHeight,
        opacity: 0,
        // width: MIN_WIDTH,
    };

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenForm, setIsOpenForm] = useState(false);

    const [wrapperStyle, setWrapperStyle] =
        useState<CSSProperties>(initialWrapperStyle);
    const [containerStyle, setContainerStyle] = useState<CSSProperties>(
        initialContainerStyle
    );
    const [detailStyle, setDetailStyle] =
        useState<CSSProperties>(initialDetailStyle);

    const toggleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    const handleOpenForm = () => {
        setIsOpenForm(true);
    };

    const handleCloseForm = () => {
        setIsOpenForm(false);
    };

    const handleDelete = () => {};

    useEffect(() => {
        if (isOpen) {
            setWrapperStyle({ marginBottom: detailContainerHeight });
            setContainerStyle({
                borderRadius: "8px 8px 0px 0px",
                backgroundColor: COLOR.grey,
                color: COLOR.white,
            });
            setDetailStyle({
                transform: "translateY(0%)",
                marginBottom: 0,
                opacity: 1,
                // width: MIN_WIDTH,
            });
        } else {
            setWrapperStyle(initialWrapperStyle);
            setContainerStyle(initialContainerStyle);
            setDetailStyle(initialDetailStyle);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    if (isOpenForm) {
        return (
            <LocationForm
                onClose={handleCloseForm}
                onSubmit={() => {}}
                title="Edit Location"
            />
        );
    }

    return (
        <div className="office-list" style={wrapperStyle}>
            <div style={{ position: "relative" }}>
                <button
                    className="office-list__container"
                    style={containerStyle}
                    onClick={toggleOpen}
                    ref={cardRef}
                >
                    <div className="office-list__desc">
                        <div className="desc__title h4">{title}</div>
                        <div
                            className="desc__caption"
                            style={{
                                color: isOpen ? COLOR.white : COLOR.grey,
                                transition: "all 0.3s ease",
                            }}
                        >
                            {caption}
                        </div>
                    </div>
                    <div
                        className="office-list__icon"
                        style={{
                            rotate: isOpen ? "-180deg" : "0deg",
                            transition: "all 0.5s ease",
                            color: isOpen ? COLOR.white : COLOR.accentBlue,
                        }}
                    >
                        <ChevronDown />
                    </div>
                </button>
            </div>

            <div
                // className="office-list__wrapper"
                style={{ position: "relative" }}
            >
                <div className="office-list__detail" style={detailStyle}>
                    <div className="detail__content" ref={cardDetailRef}>
                        <div className="content__name">{detail?.fullname}</div>
                        <div className="content__position">{detail?.job}</div>
                        <div className="content__email">{detail?.email}</div>
                        <div className="content__phone">{detail?.phone}</div>
                        <hr className="content__divider" />
                        <div className="detail__action">
                            <button
                                className="action__button"
                                onClick={handleOpenForm}
                            >
                                <Pencil />
                                EDIT
                            </button>
                            <button
                                className="action__button"
                                onClick={handleDelete}
                            >
                                <Trash />
                                DELETE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfficeList;
